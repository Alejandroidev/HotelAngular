import { Component, OnInit, OnDestroy } from '@angular/core'; // Importamos OnDestroy
import { CommonModule } from '@angular/common';
import { Room, RoomService } from '../room.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs'; // Importamos Subscription

@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './room-list.html',
  styleUrls: ['./room-list.css']
})
export class RoomListComponent implements OnInit, OnDestroy { // Implementamos OnDestroy
  rooms: Room[] = [];
  private intervalId: any; // Para guardar el ID del intervalo
  private roomSubscription: Subscription | undefined; // Para manejar la suscripción

  constructor(private roomService: RoomService) { }

  ngOnInit(): void {
    this.loadRooms(); // Cargar las habitaciones inicialmente

    // Configurar el intervalo para consultar cada 20 segundos (20000 milisegundos)
    this.intervalId = setInterval(() => {
      this.loadRooms();
    }, 5000);
  }

  ngOnDestroy(): void {
    // Limpiar el intervalo cuando el componente se destruye para evitar fugas de memoria
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.roomSubscription?.unsubscribe(); // Desuscribirse para evitar fugas de memoria
  }

  loadRooms(): void {
    this.roomSubscription = this.roomService.getRooms().subscribe({ // Guardar la suscripción
      next: (data) => {
        this.rooms = data;
        console.log('Habitaciones actualizadas:', this.rooms);
      },
      error: (err) => {
        console.error('Error al cargar habitaciones:', err);
      }
    });
  }
}