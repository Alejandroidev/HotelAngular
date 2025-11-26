import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { SearchForm } from '../search-form/search-form'; 
import { ImageGallery } from '../image-gallery/image-gallery'; 
import { CheapestRoomsComponent } from '../cheapest-rooms/cheapest-rooms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    SearchForm,
    ImageGallery,
    CheapestRoomsComponent
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {
}
