import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// No necesitamos 'map' de rxjs/operators si el HttpClient ya parsea el JSON

export interface Room {
  id: number;
  number: string;
  floor: number;
  price: number;
  capacity: number;
  roomTypeId: number;
  roomType: any | null;
  bookings: any[];
}

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiUrl = 'http://localhost:5214/room';

  constructor(private http: HttpClient) { }

  getRooms(): Observable<Room[]> {
    // *** CAMBIO CRÍTICO: VOLVER A ESPERAR UN ARRAY DE ROOM DIRECTAMENTE Y QUITAR EL .pipe(map(...)) ***
    return this.http.get<Room[]>(`${this.apiUrl}/getall`);
  }
}