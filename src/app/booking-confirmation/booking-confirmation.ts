import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { Router } from '@angular/router';
import { BookingService } from '../booking.service';
import localeEs from '@angular/common/locales/es';

// Registrar el locale español
registerLocaleData(localeEs);

@Component({
  selector: 'app-booking-confirmation',
  standalone: true,
  imports: [CommonModule],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
  templateUrl: './booking-confirmation.html',
  styleUrls: ['./booking-confirmation.css']
})
export class BookingConfirmationComponent implements OnInit {
  bookingData: any = null;
  numberOfNights: number = 0;

  constructor(
    private bookingService: BookingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener los datos de la reserva desde el servicio
    this.bookingData = this.bookingService.getCurrentBooking();
    
    // Si no hay datos de reserva, redirigir al home
    if (!this.bookingData.roomId) {
      this.router.navigate(['/']);
      return;
    }

    // Calcular número de noches
    if (this.bookingData.checkInDate && this.bookingData.checkOutDate) {
      const checkIn = new Date(this.bookingData.checkInDate);
      const checkOut = new Date(this.bookingData.checkOutDate);
      this.numberOfNights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    }
  }

  goToHome(): void {
    // Limpiar los datos de la reserva
    this.bookingService.clearBooking();
    this.router.navigate(['/']);
  }

  printConfirmation(): void {
    window.print();
  }
}
