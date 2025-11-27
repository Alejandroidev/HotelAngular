import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BookingService } from '../booking.service';

interface Booking {
  id: number;
  roomName: string;
  roomType: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalPrice: number;
  status: 'confirmada' | 'pendiente' | 'cancelada';
  clientName: string;
  clientEmail: string;
}

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './my-bookings.html',
  styleUrl: './my-bookings.css'
})
export class MyBookingsComponent implements OnInit {
  bookings: Booking[] = [];
  isLoading = true;

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    // Simular carga de reservas (en una app real, esto vendría del servicio)
    setTimeout(() => {
      this.bookings = [
        {
          id: 1001,
          roomName: 'Suite Presidential',
          roomType: 'Suite de Lujo',
          checkIn: new Date('2025-12-15'),
          checkOut: new Date('2025-12-18'),
          guests: 2,
          totalPrice: 450000,
          status: 'confirmada',
          clientName: 'Juan Pérez',
          clientEmail: 'juan@example.com'
        },
        {
          id: 1002,
          roomName: 'Habitación Doble Superior',
          roomType: 'Habitación Doble',
          checkIn: new Date('2026-01-10'),
          checkOut: new Date('2026-01-12'),
          guests: 2,
          totalPrice: 180000,
          status: 'confirmada',
          clientName: 'María García',
          clientEmail: 'maria@example.com'
        }
      ];
      this.isLoading = false;
    }, 500);
  }

  getStatusClass(status: string): string {
    return `status-${status}`;
  }

  cancelBooking(bookingId: number) {
    if (confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
      const booking = this.bookings.find(b => b.id === bookingId);
      if (booking) {
        booking.status = 'cancelada';
        alert('Reserva cancelada exitosamente');
      }
    }
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('es-CO', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  calculateNights(checkIn: Date, checkOut: Date): number {
    const diffTime = Math.abs(new Date(checkOut).getTime() - new Date(checkIn).getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}
