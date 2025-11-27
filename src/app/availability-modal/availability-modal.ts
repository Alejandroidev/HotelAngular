import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RoomService } from '../room.service';
import { BookingService } from '../booking.service';
import { ClientService, Client } from '../client.service';

@Component({
  selector: 'app-availability-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './availability-modal.html',
  styleUrls: ['./availability-modal.css']
})
export class AvailabilityModalComponent {
  @Input() roomId: string = '';
  @Input() roomName: string = '';
  @Output() close = new EventEmitter<void>();

  checkIn: string = '';
  checkOut: string = '';
  minDate: string = '';
  isLoading: boolean = false;
  result: any = null;
  errorMessage: string = '';
  
  // Estados del formulario
  showClientForm: boolean = false;
  isCreatingClient: boolean = false;
  clientCreated: boolean = false;
  isCreatingBooking: boolean = false;
  
  // Datos del cliente
  client: Client = {
    name: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  };

  constructor(
    private roomService: RoomService,
    private bookingService: BookingService,
    private clientService: ClientService,
    private router: Router
  ) {
    // Establecer fecha mínima como hoy
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    this.checkIn = this.minDate;
    
    // Fecha de salida por defecto: mañana
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.checkOut = tomorrow.toISOString().split('T')[0];
  }

  onCheckInChange(): void {
    // Si la fecha de salida es anterior o igual a la de entrada, ajustarla
    if (this.checkOut && new Date(this.checkIn) >= new Date(this.checkOut)) {
      const newCheckOut = new Date(this.checkIn);
      newCheckOut.setDate(newCheckOut.getDate() + 1);
      this.checkOut = newCheckOut.toISOString().split('T')[0];
    }
  }

  searchAvailability(): void {
    if (!this.checkIn || !this.checkOut) {
      this.errorMessage = 'Por favor seleccione las fechas de entrada y salida';
      return;
    }

    if (new Date(this.checkIn) >= new Date(this.checkOut)) {
      this.errorMessage = 'La fecha de salida debe ser posterior a la fecha de entrada';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.result = null;

    this.roomService.getRoomAvailability(this.roomId, this.checkIn, this.checkOut).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        
        // Transformar la respuesta al formato esperado
        if (response.available && response.room) {
          this.result = {
            isAvailable: true,
            id: response.room.id,
            name: response.room.name,
            description: response.room.description,
            price: response.room.price,
            capacity: response.room.capacity,
            amenities: response.room.amenities
          };
          
          // Guardar los datos en el servicio de booking
          this.bookingService.setRoom(
            response.room.id,
            response.room.name,
            response.room.description,
            response.room.price
          );
          this.bookingService.setDates(this.checkIn, this.checkOut);
          this.bookingService.setGuests(response.room.capacity); // Usar la capacidad de la habitación
          
        } else if (!response.available && response.alternativeRoom) {
          this.result = {
            isAvailable: false,
            id: response.alternativeRoom.id,
            name: response.alternativeRoom.name,
            description: response.alternativeRoom.description,
            price: response.alternativeRoom.price,
            capacity: response.alternativeRoom.capacity,
            amenities: response.alternativeRoom.amenities
          };
          
          // Guardar la alternativa en el servicio de booking
          this.bookingService.setRoom(
            response.alternativeRoom.id,
            response.alternativeRoom.name,
            response.alternativeRoom.description,
            response.alternativeRoom.price
          );
          this.bookingService.setDates(this.checkIn, this.checkOut);
          this.bookingService.setGuests(response.alternativeRoom.capacity); // Usar la capacidad de la habitación alternativa
          
        } else {
          this.errorMessage = 'No se encontraron habitaciones disponibles';
        }
        
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al buscar disponibilidad:', error);
        this.errorMessage = 'Error al buscar disponibilidad. Por favor intente nuevamente.';
        this.isLoading = false;
      }
    });
  }

  closeModal(): void {
    this.close.emit();
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  // Mostrar formulario de cliente
  showBookingForm(): void {
    this.showClientForm = true;
  }

  // Crear cliente y proceder con la reserva
  createClientAndBook(): void {
    // Validar que todos los campos estén llenos
    if (!this.client.name || !this.client.lastName || !this.client.email || !this.client.phoneNumber) {
      this.errorMessage = 'Por favor complete todos los campos del formulario';
      return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.client.email)) {
      this.errorMessage = 'Por favor ingrese un email válido';
      return;
    }

    this.isCreatingClient = true;
    this.errorMessage = '';

    console.log('📝 Datos del cliente a enviar:', this.client);

    this.clientService.createClient(this.client).subscribe({
      next: (createdClient) => {
        console.log('✅ Respuesta completa del servidor:', createdClient);
        console.log('📌 ID del cliente:', createdClient.id);
        
        // Guardar el ID del cliente en el servicio de booking
        if (createdClient && createdClient.id) {
          this.bookingService.setClient(createdClient.id);
          console.log('💾 Cliente ID guardado en BookingService');
          
          // Mostrar mensaje apropiado según si el cliente ya existía o fue creado
          console.log('ℹ️ Cliente procesado correctamente (puede ser nuevo o existente)');
        } else {
          console.warn('⚠️ El servidor no devolvió un ID de cliente');
        }
        
        // Marcar que el cliente fue creado/encontrado para mostrar el botón de finalizar
        this.clientCreated = true;
        this.isCreatingClient = false;
        this.errorMessage = '';
      },
      error: (error) => {
        console.error('❌ Error completo al crear cliente:', error);
        console.error('❌ Status:', error.status);
        console.error('❌ Status Text:', error.statusText);
        console.error('❌ Error Message:', error.message);
        console.error('❌ Error Body:', error.error);
        
        let errorMsg = 'Error al crear el cliente. ';
        
        if (error.status === 0) {
          errorMsg += 'No se puede conectar con el servidor. Verifique que el backend esté ejecutándose.';
        } else if (error.status === 400) {
          errorMsg += 'Datos inválidos. ' + (error.error?.message || '');
        } else if (error.status === 500) {
          errorMsg += 'Error interno del servidor.';
        } else {
          errorMsg += 'Por favor intente nuevamente.';
        }
        
        this.errorMessage = errorMsg;
        this.isCreatingClient = false;
      }
    });
  }

  // Finalizar la reserva
  finalizeBooking(): void {
    this.isCreatingBooking = true;
    this.errorMessage = '';

    this.bookingService.createBooking().subscribe({
      next: (response) => {
        console.log('✅ Reserva creada exitosamente:', response);
        
        this.isCreatingBooking = false;
        
        // Cerrar el modal
        this.closeModal();
        
        // Redirigir a la página de confirmación
        this.router.navigate(['/confirmacion-reserva']);
      },
      error: (error) => {
        console.error('❌ Error al crear la reserva:', error);
        this.errorMessage = 'Error al crear la reserva. Por favor intente nuevamente.';
        this.isCreatingBooking = false;
      }
    });
  }

  // Cancelar formulario de cliente
  cancelClientForm(): void {
    this.showClientForm = false;
    this.clientCreated = false;
    this.client = {
      name: '',
      lastName: '',
      email: '',
      phoneNumber: ''
    };
  }
}
