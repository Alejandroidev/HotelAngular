import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './search-form.html',
  styleUrls: ['./search-form.css'],
})
export class SearchForm {
  @ViewChild('checkInInput') checkInInput!: ElementRef<HTMLInputElement>;
  @ViewChild('checkOutInput') checkOutInput!: ElementRef<HTMLInputElement>;

  checkInDateValue: string;
  checkOutDateValue: string;
  guestsValue: number = 1;
  
  minCheckInDate: string;
  minCheckOutDate: string;

  constructor(private router: Router) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    this.minCheckInDate = this.formatDateForInput(today);
    this.checkInDateValue = this.formatDateForInput(today);
    
    this.minCheckOutDate = this.formatDateForInput(tomorrow);
    this.checkOutDateValue = this.formatDateForInput(tomorrow);
  }

  onCheckInChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.checkInDateValue = input.value;
    
    // Actualizar fecha mínima de checkout
    const checkInDate = new Date(input.value);
    const minCheckOut = new Date(checkInDate);
    minCheckOut.setDate(minCheckOut.getDate() + 1);
    this.minCheckOutDate = this.formatDateForInput(minCheckOut);
    
    // Si checkout es antes del nuevo mínimo, ajustarlo
    if (this.checkOutDateValue < this.minCheckOutDate) {
      this.checkOutDateValue = this.minCheckOutDate;
    }
  }

  onCheckOutChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.checkOutDateValue = input.value;
  }

  onGuestsChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.guestsValue = parseInt(input.value, 10);
  }

  openDatePicker(inputId: string) {
    if (inputId === 'checkInDate' && this.checkInInput) {
      this.checkInInput.nativeElement.showPicker();
    } else if (inputId === 'checkOutDate' && this.checkOutInput) {
      this.checkOutInput.nativeElement.showPicker();
    }
  }

  onSubmit() {
    if (this.checkInDateValue && this.checkOutDateValue && this.guestsValue) {
      this.router.navigate(['/disponibilidad'], {
        queryParams: {
          checkIn: this.checkInDateValue,
          checkOut: this.checkOutDateValue,
          guests: this.guestsValue
        }
      });
    }
  }

  private formatDateForInput(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}