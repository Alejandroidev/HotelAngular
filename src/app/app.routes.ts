import { Routes } from '@angular/router';
import { AvailableRoomsComponent } from './available-rooms/available-rooms';
import { HomeComponent } from './home/home';
import { RoomsComponent } from './rooms/rooms';
import { BookingConfirmationComponent } from './booking-confirmation/booking-confirmation';
import { MyBookingsComponent } from './my-bookings/my-bookings';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Hotel U Colombia - Inicio'
  },
  {
    path: 'habitaciones',
    component: RoomsComponent,
    title: 'Nuestras Habitaciones'
  },
  {
    path: 'disponibilidad',
    component: AvailableRoomsComponent,
    title: 'Habitaciones Disponibles'
  },
  {
    path: 'confirmacion-reserva',
    component: BookingConfirmationComponent,
    title: 'Confirmación de Reserva'
  },
  {
    path: 'mis-reservas',
    component: MyBookingsComponent,
    title: 'Mis Reservaciones'
  }
];
