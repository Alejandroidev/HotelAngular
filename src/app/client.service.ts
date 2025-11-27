import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Client {
  id?: string;
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'http://localhost:5214/client';

  constructor(private http: HttpClient) {}

  createClient(client: Client): Observable<Client> {
    // Crear el objeto sin el id para el POST
    const clientDto = {
      name: client.name,
      lastName: client.lastName,
      email: client.email,
      phoneNumber: client.phoneNumber
    };
    
    console.log('📤 Enviando cliente al backend:', clientDto);
    console.log('� URL:', this.apiUrl);
    console.log('📤 JSON stringified:', JSON.stringify(clientDto));
    
    // Intentar sin withCredentials primero para ver si ese es el problema
    return this.http.post<Client>(this.apiUrl, clientDto);
  }
}
