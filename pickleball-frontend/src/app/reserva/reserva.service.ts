import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reserva } from '../models/reserva.model';
import { environment } from '../../environments/environment';

interface DisponibilidadBackend {
  horas: {
    [hora: string]: {
      pista1: boolean;
      pista2: boolean;
      pista3: boolean;
      pista4: boolean;
    };
  };
}

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private readonly baseUrl = environment.apiUrl;
  private readonly apiUrl = `${this.baseUrl}/reservas/`;
  private readonly disponibilidadUrl = `${this.baseUrl}/disponibilidad/`;

  constructor(private http: HttpClient) {}

  crearReserva(reserva: Reserva): Observable<any> {
    return this.http.post<any>(this.apiUrl, reserva);
  }

  obtenerDisponibilidad(fecha: string): Observable<DisponibilidadBackend> {
    const url = `${this.disponibilidadUrl}?fecha=${fecha}`;
    return this.http.get<DisponibilidadBackend>(url);
  }
}
