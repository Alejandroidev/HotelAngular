import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RoomService, RoomWithAmenities } from '../room.service';
import { AvailabilityModalComponent } from '../availability-modal/availability-modal';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, AvailabilityModalComponent],
  templateUrl: './rooms.html',
  styleUrls: ['./rooms.css']
})
export class RoomsComponent implements OnInit, OnDestroy {
  allRooms: RoomWithAmenities[] = [];
  isLoading: boolean = true;
  showModal: boolean = false;
  selectedRoom: RoomWithAmenities | null = null;
  cheapestByType: Set<string> = new Set(); // IDs de las habitaciones más baratas por tipo
  mostAmenitiesByType: Set<string> = new Set(); // IDs de las habitaciones con más amenidades por tipo

  constructor(
    private roomService: RoomService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Suscribirse al observable de todas las habitaciones con amenities
    this.roomService.allRooms$.subscribe(rooms => {
      console.log('📦 Habitaciones recibidas:', rooms);
      if (rooms && rooms.length > 0) {
        // Ordenar por precio (más barata primero)
        this.allRooms = this.sortAndMarkCheapestByType(rooms);
        this.isLoading = false;
      }
    });

    // Conectar a SignalR y luego solicitar datos
    this.roomService.connectToCheapestByType();
    
    // Esperar un momento para que SignalR se conecte completamente
    setTimeout(() => {
      console.log('🔔 Solicitando datos de habitaciones...');
      this.roomService.requestAllRoomsWithAmenitiesPush().subscribe({
        next: () => {
          console.log('✅ Solicitud de habitaciones enviada exitosamente');
          // Si no recibe datos en 5 segundos, mostrar error
          setTimeout(() => {
            if (this.isLoading) {
              console.warn('⚠️ No se recibieron datos después de 5 segundos');
              this.isLoading = false;
            }
          }, 5000);
        },
        error: (err) => {
          console.error('❌ Error al cargar habitaciones:', err);
          console.error('URL intentada:', err.url);
          console.error('Status:', err.status);
          console.error('Mensaje:', err.message);
          this.isLoading = false;
        }
      });
    }, 1000); // Esperar 1 segundo para que SignalR se conecte
  }

  ngOnDestroy(): void {
    // NO desconectar de SignalR - mantener la conexión activa para otros componentes
    // this.roomService.disconnectFromCheapestByType();
    console.log('Componente de habitaciones destruido - conexión SignalR se mantiene activa');
  }

  searchAvailability(room: RoomWithAmenities): void {
    // Abrir modal de disponibilidad
    this.selectedRoom = room;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedRoom = null;
  }

  // Ordenar habitaciones por precio y marcar las más baratas de cada tipo
  sortAndMarkCheapestByType(rooms: RoomWithAmenities[]): RoomWithAmenities[] {
    // Primero ordenar todas las habitaciones por precio (menor a mayor)
    const sortedRooms = [...rooms].sort((a, b) => a.price - b.price);
    
    // Agrupar por typeRoomId para encontrar la más barata de cada tipo
    const cheapestByType = new Map<string, number>();
    const mostAmenitiesByType = new Map<string, { count: number, roomId: string }>();
    
    sortedRooms.forEach(room => {
      // Marcar la más barata de cada tipo
      if (!cheapestByType.has(room.typeRoomId)) {
        // Esta es la primera (más barata) de este tipo
        cheapestByType.set(room.typeRoomId, room.price);
        this.cheapestByType.add(room.id);
      }
      
      // Marcar la que tiene más amenidades de cada tipo
      const amenitiesCount = room.amenities?.length || 0;
      const current = mostAmenitiesByType.get(room.typeRoomId);
      
      if (!current || amenitiesCount > current.count) {
        // Si no hay registro o esta habitación tiene más amenidades
        if (current) {
          // Remover la anterior
          this.mostAmenitiesByType.delete(current.roomId);
        }
        mostAmenitiesByType.set(room.typeRoomId, { count: amenitiesCount, roomId: room.id });
        this.mostAmenitiesByType.add(room.id);
      }
    });
    
    console.log('💰 Habitaciones más baratas por tipo:', Array.from(this.cheapestByType));
    console.log('🌟 Habitaciones con más amenidades por tipo:', Array.from(this.mostAmenitiesByType));
    
    return sortedRooms;
  }

  // Verificar si una habitación es la más barata de su tipo
  isCheapestOfType(roomId: string): boolean {
    return this.cheapestByType.has(roomId);
  }

  // Verificar si una habitación tiene más amenidades de su tipo
  hasMostAmenities(roomId: string): boolean {
    return this.mostAmenitiesByType.has(roomId);
  }

  // Obtener ID de imagen según el tipo de habitación
  getRoomImageId(description: string): string {
    const desc = description.toLowerCase();
    
    // Mapeo de tipos de habitación a URLs completas de imágenes verificadas
    if (desc.includes('suite') || desc.includes('presidential')) {
      // Suite de lujo con cama king
      return '1591088398332-8a7791972843';
    } else if (desc.includes('doble') || desc.includes('double')) {
      // Habitación doble con dos camas
      return '1631049307264-da0ec9d70304';
    } else if (desc.includes('simple') || desc.includes('single')) {
      // Habitación simple moderna
      return '1611892440504-42a792e24d32';
    } else if (desc.includes('family') || desc.includes('familiar')) {
      // Habitación familiar amplia
      return '1598928506311-c55ded91a20c';
    } else if (desc.includes('deluxe')) {
      // Habitación deluxe elegante
      return '1582719508461-905c673771fd';
    } else if (desc.includes('junior')) {
      // Junior suite
      return '1590490360182-c33d57733427';
    } else {
      // Habitación de hotel estándar
      return '1566665797739-1674de7a421a';
    }
  }

  // Manejar error de carga de imagen
  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    // Imagen de respaldo - habitación de hotel genérica
    imgElement.src = 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&h=400&fit=crop&q=80';
  }
}