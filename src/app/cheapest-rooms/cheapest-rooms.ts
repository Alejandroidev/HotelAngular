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
}
