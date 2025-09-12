import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms'; 

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

  constructor() {}

  onSubmit() {
    if (this.searchForm.valid) {
      console.log('Formulario de búsqueda enviado:', this.searchForm.value);
    }
  }
}