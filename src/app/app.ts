import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { SearchForm } from './search-form/search-form'; 
import { ImageGallery } from './image-gallery/image-gallery'; 
import { RoomListComponent } from './room-list/room-list'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatButtonModule, 
    SearchForm, 
    ImageGallery,
    RoomListComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title = 'MiAppHotelStandalone';
}