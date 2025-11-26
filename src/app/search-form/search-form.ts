import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

// Módulos de Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule, 
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './search-form.html',
  styleUrls: ['./search-form.css'],
})
export class SearchForm {
  searchForm = new FormGroup({
    checkInDate: new FormControl<Date | null>(null),
    checkOutDate: new FormControl<Date | null>(null),
    guests: new FormControl(1), 
  });

  constructor(private router: Router) {}

  onSubmit() {
    if (this.searchForm.valid) {
      const checkIn = this.searchForm.value.checkInDate;
      const checkOut = this.searchForm.value.checkOutDate;
      const guests = this.searchForm.value.guests || 1;

      if (checkIn && checkOut) {
        // Formatear fechas a yyyy-MM-dd
        const checkInStr = this.formatDate(checkIn);
        const checkOutStr = this.formatDate(checkOut);

        // Navegar a la página de disponibilidad con parámetros
        this.router.navigate(['/disponibilidad'], {
          queryParams: {
            checkIn: checkInStr,
            checkOut: checkOutStr,
            guests: guests
          }
        });
      } else {
        console.warn('Por favor seleccione fechas de entrada y salida');
      }
    }
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}