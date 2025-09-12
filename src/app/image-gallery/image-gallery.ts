import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-image-gallery',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './image-gallery.html',
  styleUrls: ['./image-gallery.css']
})
export class ImageGallery {
  images = [
    {
      src: 'https://th.bing.com/th/id/OIP.mgPADC2mpN90LeM5z6I5TwHaEo?r=0&rs=1&pid=ImgDetMain&cb=idpwebp2&o=7&rm=3.jpg', 
      alt: 'Habitación Deluxe del Hotel',
      title: 'Habitación Deluxe',
      description: 'Espaciosa y elegante, ideal para un descanso perfecto.'
    },
    {
      src: 'https://www.soreparos.com.br/wp-content/uploads/2017/12/piscina-de-vinil-1.jpg',
      alt: 'Piscina del Hotel',
      title: 'Piscina y Spa',
      description: 'Un oasis de relajación con vistas panorámicas.'
    },
    {
      src: 'https://th.bing.com/th/id/R.db04b7b3ad61b64f3a27062fec9b3fa3?rik=Pjwi3faIFhlCPA&pid=ImgRaw&r=0.jpg',
      alt: 'Lobby Moderno del Hotel',
      title: 'Nuestro Lobby',
      description: 'Un ambiente acogedor para tu llegada.'
    },
    {
      src: 'https://th.bing.com/th/id/R.c67cb2a4768ae380d1d1d97fa1a68f98?rik=sW%2feiW4e1jbuoQ&riu=http%3a%2f%2fexpertoenhoteles.com%2fwp-content%2fuploads%2f2020%2f01%2famandinehcs-1500x844.jpg&ehk=SnzrXhpzVJWIY3sRBHGl0mWLmzOh1wXXINKdFglslJ0%3d&risl=&pid=ImgRaw&r=0.jpg',
      alt: 'Restaurante del Hotel',
      title: 'Gastronomía Exquisita',
      description: 'Deléitate con nuestros sabores únicos.'
    }
  ];

  constructor() { }
}