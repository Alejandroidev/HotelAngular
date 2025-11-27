import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RoomService, RoomWithAmenities } from '../room.service';
import { AvailabilityModalComponent } from '../availability-modal/availability-modal';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, AvailabilityModalComponent],
  templateUrl: './rooms.html',
  styleUrls: ['./rooms.css']
})
export class RoomsComponent implements OnInit, OnDestroy {
  allRooms: RoomWithAmenities[] = [];
  isLoading: boolean = true;
  showModal: boolean = false;
  selectedRoom: RoomWithAmenities | null = null;

  constructor(
    private roomService: RoomService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Suscribirse al observable de todas las habitaciones con amenities
    this.roomService.allRooms$.subscribe(rooms => {
      console.log('📦 Habitaciones recibidas:', rooms);
      if (rooms && rooms.length > 0) {
        this.allRooms = rooms;
        this.isLoading = false;
      }
    });

    // Conectar a SignalR y luego solicitar datos
    this.roomService.connectToCheapestByType();
    
    // Esperar un momento para que SignalR se conecte completamente
    setTimeout(() => {
      console.log('🔔 Solicitando datos de habitaciones...');
      this.roomService.requestAllRoomsWithAmenitiesPush().subscribe({
        next: () => {
          console.log('✅ Solicitud de habitaciones enviada exitosamente');
          // Si no recibe datos en 5 segundos, mostrar error
          setTimeout(() => {
            if (this.isLoading) {
              console.warn('⚠️ No se recibieron datos después de 5 segundos');
              this.isLoading = false;
            }
          }, 5000);
        },
        error: (err) => {
          console.error('❌ Error al cargar habitaciones:', err);
          console.error('URL intentada:', err.url);
          console.error('Status:', err.status);
          console.error('Mensaje:', err.message);
          this.isLoading = false;
        }
      });
    }, 1000); // Esperar 1 segundo para que SignalR se conecte
  }

  ngOnDestroy(): void {
    // NO desconectar de SignalR - mantener la conexión activa para otros componentes
    // this.roomService.disconnectFromCheapestByType();
    console.log('Componente de habitaciones destruido - conexión SignalR se mantiene activa');
  }

  searchAvailability(room: RoomWithAmenities): void {
    // Abrir modal de disponibilidad
    this.selectedRoom = room;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedRoom = null;
  }
}
