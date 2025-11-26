import { Routes } from '@angular/router';
import { AvailableRoomsComponent } from './available-rooms/available-rooms';
import { HomeComponent } from './home/home';
import { RoomsComponent } from './rooms/rooms';

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
  }
];
