import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import * as signalR from '@microsoft/signalr';
// No necesitamos 'map' de rxjs/operators si el HttpClient ya parsea el JSON

export interface Room {
  id: number;
  number: string;
  floor: number;
  price: number;
  capacity: number;
  roomTypeId: number;
  roomType: any | null;
  bookings: any[];
}

export interface CheapestRoom {
  id: string;
  typeRoomId: string;
  name: string;
  description: string;
  price: number;
  capacity: number;
  isFeatured: boolean;
  locationId: string;
}

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiUrl = 'http://localhost:5214/room';
  private hubConnection: signalR.HubConnection | null = null;
  private cheapestRoomsSubject = new Subject<CheapestRoom[]>();
  
  public cheapestRooms$ = this.cheapestRoomsSubject.asObservable();

  constructor(private http: HttpClient) { }

  getRooms(): Observable<Room[]> {
    // *** CAMBIO CRÍTICO: VOLVER A ESPERAR UN ARRAY DE ROOM DIRECTAMENTE Y QUITAR EL .pipe(map(...)) ***
    return this.http.get<Room[]>(`${this.apiUrl}/getall`);
  }

  getAvailableRooms(checkIn: string, checkOut: string, guests: number): Observable<CheapestRoom[]> {
    const params = {
      checkIn: checkIn,
      checkOut: checkOut,
      guests: guests.toString()
    };
    return this.http.get<CheapestRoom[]>(`${this.apiUrl}s/available`, { params });
  }

  // Método para solicitar el push de habitaciones más económicas
  requestCheapestRoomsPush(): Observable<any> {
    return this.http.post('http://localhost:5214/rooms/cheapest/push', {});
  }

  connectToCheapestByType(): void {
    if (this.hubConnection && this.hubConnection.state === signalR.HubConnectionState.Connected) {
      console.log('SignalR ya está conectado');
      return;
    }

    try {
      // Crear conexión a SignalR Hub
      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl('http://localhost:5214/hubs/aggregates', {
          skipNegotiation: false,
          transport: signalR.HttpTransportType.WebSockets | signalR.HttpTransportType.ServerSentEvents | signalR.HttpTransportType.LongPolling
        })
        .withAutomaticReconnect()
        .configureLogging(signalR.LogLevel.Information)
        .build();

      // Escuchar evento broadcast (el que realmente envía el backend)
      this.hubConnection.on('broadcast', (message: any) => {
        // Verificar si es el evento de CheapestByType
        if (message.action === 'CheapestByType' && message.group === 'rooms') {
          console.log('📨 Habitaciones económicas actualizadas');
          if (Array.isArray(message.payload)) {
            this.cheapestRoomsSubject.next(message.payload);
          }
        }
      });

      // Manejar reconexión
      this.hubConnection.onreconnecting((error) => {
        console.warn('🔄 SignalR reconectando...', error);
      });

      this.hubConnection.onreconnected((connectionId) => {
        console.log('✅ SignalR reconectado:', connectionId);
        // Re-suscribirse al grupo después de reconectar
        this.hubConnection?.invoke('Subscribe', 'rooms')
          .catch(err => console.error('Error al re-suscribirse:', err));
      });

      this.hubConnection.onclose((error) => {
        console.log('🔌 SignalR desconectado', error);
      });

      // Iniciar conexión
      this.hubConnection.start()
        .then(() => {
          console.log('✅ SignalR conectado exitosamente a /hubs/aggregates');
          // Suscribirse al grupo de habitaciones
          return this.hubConnection?.invoke('Subscribe', 'rooms');
        })
        .then(() => {
          console.log('✅ Suscrito al grupo de habitaciones');
        })
        .catch(err => {
          console.error('❌ Error al conectar SignalR:', err);
          console.error('Detalles completos del error:', JSON.stringify(err, null, 2));
          console.warn('Verifique:');
          console.warn('1. Backend corriendo en http://localhost:5214');
          console.warn('2. Hub mapeado en /hubs/aggregates');
          console.warn('3. CORS configurado correctamente');
        });

    } catch (error) {
      console.error('Error al crear conexión SignalR:', error);
      console.warn('SignalR no está disponible. La aplicación continuará funcionando sin datos en tiempo real.');
    }
  }

  disconnectFromCheapestByType(): void {
    if (this.hubConnection) {
      this.hubConnection.invoke('Unsubscribe', 'rooms')
        .then(() => {
          console.log('Desuscrito del grupo de habitaciones');
          return this.hubConnection?.stop();
        })
        .then(() => {
          console.log('SignalR desconectado');
          this.hubConnection = null;
        })
        .catch(err => console.error('Error al desconectar SignalR:', err));
    }
  }
}