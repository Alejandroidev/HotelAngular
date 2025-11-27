import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RoomService, CheapestRoom } from '../room.service';
import { Subscription } from 'rxjs';
import { AvailabilityModalComponent } from '../availability-modal/availability-modal';

@Component({
  selector: 'app-cheapest-rooms',
  standalone: true,
  imports: [CommonModule, AvailabilityModalComponent],
  templateUrl: './cheapest-rooms.html',
  styleUrls: ['./cheapest-rooms.css']
})
export class CheapestRoomsComponent implements OnInit, OnDestroy {
  cheapestRooms: CheapestRoom[] = [];
  private subscription: Subscription | null = null;
  showModal: boolean = false;
  selectedRoom: CheapestRoom | null = null;

  constructor(
    private roomService: RoomService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Conectar al SignalR Hub
    this.roomService.connectToCheapestByType();

    // Suscribirse a los datos del hub (se actualizan en tiempo real)
    this.subscription = this.roomService.cheapestRooms$.subscribe(
      (rooms) => {
        this.cheapestRooms = rooms;
      },
      (error) => {
        console.error('Error al recibir habitaciones económicas:', error);
      }
    );

    // Solicitar datos iniciales una vez al cargar
    setTimeout(() => {
      this.roomService.requestCheapestRoomsPush().subscribe({
        error: (err) => console.error('Error al solicitar habitaciones:', err)
      });
    }, 1000);
  }

  ngOnDestroy(): void {
    // Solo desuscribirse del observable, mantener conexión SignalR activa
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    // NO desconectar SignalR - mantener la conexión para otros componentes
    // this.roomService.disconnectFromCheapestByType();
    console.log('Componente de habitaciones económicas destruido - conexión SignalR se mantiene activa');
  }

  searchAvailability(room: CheapestRoom): void {
    // Abrir modal de disponibilidad
    this.selectedRoom = room;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedRoom = null;
  }

  // Método para obtener el ID de imagen según el tipo de habitación
  getRoomImageId(roomName: string): string {
    const name = roomName.toLowerCase();
    
    if (name.includes('estándar') || name.includes('estandar')) {
      return 'gGC63y9H0U0'; // Habitación estándar elegante
    } else if (name.includes('doble')) {
      return 'KXkgQoEw_DU'; // Habitación doble
    } else if (name.includes('suite')) {
      return 'QRawWgV6gmo'; // Suite de lujo
    } else if (name.includes('ejecutiva')) {
      return 'ZqREbckCRQA'; // Habitación ejecutiva moderna
    } else if (name.includes('presidencial')) {
      return 'r_IBLz27FD8'; // Suite presidencial
    } else if (name.includes('familiar')) {
      return 'JR4Zw0IlPGQ'; // Habitación familiar
    }
    
    // Imagen por defecto para habitaciones de hotel
    return 'gGC63y9H0U0';
  }

  // Manejar error de carga de imagen
  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=500&h=350&fit=crop';
  }
}
