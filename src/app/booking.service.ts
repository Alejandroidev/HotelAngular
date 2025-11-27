import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface BookingData {
  id?: string;
  clientId?: string;
  roomId?: string;
  roomName?: string;
  roomDescription?: string;
  roomPrice?: number;
  statusBookingId?: string;
  status?: string;
  checkInDate?: string;
  checkOutDate?: string;
  numberOfGuests?: number;
  totalPrice?: number;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private bookingDataSubject = new BehaviorSubject<BookingData>({});
  public bookingData$ = this.bookingDataSubject.asObservable();
  private apiUrl = 'http://localhost:5214/booking';

  constructor(private http: HttpClient) { }

  // Obtener los datos actuales de la reserva
  getCurrentBooking(): BookingData {
    return this.bookingDataSubject.value;
  }

  // Actualizar parcialmente los datos de la reserva
  updateBookingData(data: Partial<BookingData>): void {
    const currentData = this.bookingDataSubject.value;
    const updatedData = { ...currentData, ...data };
    this.bookingDataSubject.next(updatedData);
    console.log('📝 Datos de reserva actualizados:', updatedData);
  }

  // Establecer la habitación seleccionada
  setRoom(roomId: string, roomName: string, roomDescription: string, roomPrice: number): void {
    this.updateBookingData({
      roomId,
      roomName,
      roomDescription,
      roomPrice
    });
  }

  // Establecer las fechas de la reserva
  setDates(checkInDate: string, checkOutDate: string): void {
    this.updateBookingData({
      checkInDate,
      checkOutDate
    });
    this.calculateTotalPrice();
  }

  // Establecer el número de huéspedes
  setGuests(numberOfGuests: number): void {
    this.updateBookingData({
      numberOfGuests
    });
  }

  // Establecer el cliente
  setClient(clientId: string): void {
    this.updateBookingData({
      clientId
    });
  }

  // Calcular el precio total basado en las fechas y precio por noche
  private calculateTotalPrice(): void {
    const booking = this.getCurrentBooking();
    
    if (booking.checkInDate && booking.checkOutDate && booking.roomPrice) {
      const checkIn = new Date(booking.checkInDate);
      const checkOut = new Date(booking.checkOutDate);
      const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
      const totalPrice = nights * booking.roomPrice;
      
      this.updateBookingData({
        totalPrice
      });
      
      console.log(`💰 Precio calculado: ${nights} noches x $${booking.roomPrice} = $${totalPrice}`);
    }
  }

  // Limpiar todos los datos de la reserva
  clearBooking(): void {
    this.bookingDataSubject.next({});
    console.log('🗑️ Datos de reserva limpiados');
  }

  // Verificar si la reserva está completa
  isBookingComplete(): boolean {
    const booking = this.getCurrentBooking();
    return !!(
      booking.roomId &&
      booking.checkInDate &&
      booking.checkOutDate &&
      booking.numberOfGuests &&
      booking.totalPrice
    );
  }

  // Obtener el DTO formateado para enviar al backend
  getBookingDto(): any {
    const booking = this.getCurrentBooking();
    
    // No enviar el ID ni statusBookingId (el backend los genera/asigna)
    const dto: any = {
      clientId: booking.clientId,
      roomId: booking.roomId,
      checkInDate: this.formatDateForBackend(booking.checkInDate),
      checkOutDate: this.formatDateForBackend(booking.checkOutDate),
      numberOfGuests: booking.numberOfGuests || 1,
      totalPrice: booking.totalPrice || 0,
      status: 'Confirmado'
    };
    
    return dto;
  }

  // Formatear fecha para el backend (ISO 8601)
  private formatDateForBackend(date?: string): string {
    if (!date) return new Date().toISOString();
    
    // Si la fecha ya está en formato ISO, retornarla
    if (date.includes('T')) return date;
    
    // Convertir fecha YYYY-MM-DD a ISO 8601 (DateTime)
    const dateObj = new Date(date + 'T00:00:00.000Z');
    return dateObj.toISOString();
  }

  // Crear la reserva en el backend
  createBooking(): Observable<any> {
    const bookingDto = this.getBookingDto();
    console.log('📤 Enviando reserva al backend:', bookingDto);
    return this.http.post(this.apiUrl, bookingDto, {
      withCredentials: true
    });
  }
}
