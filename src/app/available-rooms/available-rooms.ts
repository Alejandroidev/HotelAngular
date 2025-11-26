import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RoomService, CheapestRoom } from '../room.service';

@Component({
  selector: 'app-available-rooms',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './available-rooms.html',
  styleUrls: ['./available-rooms.css']
})
export class AvailableRoomsComponent implements OnInit {
  checkIn: string = '';
  checkOut: string = '';
  guests: number = 1;
  availableRooms: CheapestRoom[] = [];
  isLoading: boolean = false;
  hasSearched: boolean = false;
  errorMessage: string = '';

  // Fecha mínima es hoy
  minDate: string = '';

  constructor(
    private roomService: RoomService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Establecer fecha mínima como hoy
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    
    // Leer parámetros de la URL
    this.route.queryParams.subscribe(params => {
      if (params['checkIn'] && params['checkOut'] && params['guests']) {
        // Si vienen parámetros, usarlos y buscar automáticamente
        this.checkIn = params['checkIn'];
        this.checkOut = params['checkOut'];
        this.guests = +params['guests'];
        this.searchAvailableRooms();
      } else {
        // Si no vienen parámetros, establecer fechas por defecto
        this.checkIn = this.minDate;
        
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        this.checkOut = tomorrow.toISOString().split('T')[0];
      }
    });
  }

  searchAvailableRooms(): void {
    if (!this.checkIn || !this.checkOut || !this.guests) {
      this.errorMessage = 'Por favor complete todos los campos';
      return;
    }

    if (new Date(this.checkIn) >= new Date(this.checkOut)) {
      this.errorMessage = 'La fecha de salida debe ser posterior a la fecha de entrada';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.hasSearched = false;

    this.roomService.getAvailableRooms(this.checkIn, this.checkOut, this.guests)
      .subscribe({
        next: (rooms) => {
          this.availableRooms = rooms;
          this.isLoading = false;
          this.hasSearched = true;
        },
        error: (error) => {
          console.error('Error al buscar habitaciones disponibles:', error);
          this.errorMessage = 'Error al buscar habitaciones. Por favor intente nuevamente.';
          this.isLoading = false;
          this.hasSearched = true;
          this.availableRooms = [];
        }
      });
  }

  onCheckInChange(): void {
    // Si la fecha de salida es anterior o igual a la de entrada, ajustarla
    if (this.checkOut && new Date(this.checkIn) >= new Date(this.checkOut)) {
      const newCheckOut = new Date(this.checkIn);
      newCheckOut.setDate(newCheckOut.getDate() + 1);
      this.checkOut = newCheckOut.toISOString().split('T')[0];
    }
  }
}
