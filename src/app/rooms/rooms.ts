import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RoomService, CheapestRoom } from '../room.service';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rooms.html',
  styleUrls: ['./rooms.css']
})
export class RoomsComponent implements OnInit, OnDestroy {
  allRooms: CheapestRoom[] = [];
  isLoading: boolean = true;

  constructor(
    private roomService: RoomService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Conectar a SignalR para recibir actualizaciones
    this.roomService.connectToCheapestByType();
    
    // Suscribirse al observable de habitaciones económicas
    this.roomService.cheapestRooms$.subscribe(rooms => {
      this.allRooms = rooms;
      this.isLoading = false;
    });

    // Solicitar los datos iniciales
    this.roomService.requestCheapestRoomsPush().subscribe({
      next: () => console.log('Datos de habitaciones solicitados'),
      error: (err) => {
        console.error('Error al cargar habitaciones:', err);
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy(): void {
    // Desconectar de SignalR al salir del componente
    this.roomService.disconnectFromCheapestByType();
  }

  searchAvailability(room: CheapestRoom): void {
    // Navegar a la página de disponibilidad
    this.router.navigate(['/disponibilidad']);
  }
}
