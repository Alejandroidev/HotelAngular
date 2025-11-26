import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomService, CheapestRoom } from '../room.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cheapest-rooms',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cheapest-rooms.html',
  styleUrls: ['./cheapest-rooms.css']
})
export class CheapestRoomsComponent implements OnInit, OnDestroy {
  cheapestRooms: CheapestRoom[] = [];
  private subscription: Subscription | null = null;

  constructor(private roomService: RoomService) { }

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
    // Desconectar del WebSocket cuando el componente se destruye
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.roomService.disconnectFromCheapestByType();
  }
}
