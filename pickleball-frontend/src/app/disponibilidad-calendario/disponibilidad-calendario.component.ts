import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservaService } from '../reserva/reserva.service';
import { Reserva } from '../models/reserva.model';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';

interface DisponibilidadFrontend {
  hora: string;
  pista1: boolean;
  pista2: boolean;
  pista3: boolean;
  pista4: boolean;
  [key: string]: string | boolean;
}

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

@Component({
  selector: 'app-disponibilidad-calendario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './disponibilidad-calendario.component.html',
  styleUrls: ['./disponibilidad-calendario.component.scss']
})
export class DisponibilidadCalendarioComponent implements OnInit {
  disponibilidadPistas: DisponibilidadFrontend[] = [];
  horasReserva: string[] = [
    '09:00 - 10:30', '10:30 - 12:00', '12:00 - 13:30', '13:30 - 15:00',
    '15:00 - 16:30', '16:30 - 18:00', '18:00 - 19:30', '19:30 - 21:00',
  ];
  pistas: string[] = ['Pista 1', 'Pista 2', 'Pista 3', 'Pista 4'];
  franjaSeleccionada: { hora: string; pista: string } | null = null;
  mensajeReserva: string = '';
  esReservaExitosa: boolean | null = null;
  fechaSeleccionada: string = '';
  usuarioEmail: string | null = null;
  diasDisponibles: { fecha: string, label: string }[] = [];

  mostrarConfirmacion: boolean = false;
  textoConfirmacion: string = '';

  constructor(
    private reservaService: ReservaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.generarDiasDisponibles();

    const email = this.authService.getEmail();
    if (email) {
      this.usuarioEmail = email;
      this.fechaSeleccionada = this.diasDisponibles[0].fecha;
      this.cargarDisponibilidad(this.fechaSeleccionada);
    } else {
      this.mensajeReserva = 'Debes iniciar sesión para reservar.';
      this.esReservaExitosa = false;
    }
  }

  generarDiasDisponibles(): void {
    const hoy = new Date();
    this.diasDisponibles = [];

    for (let i = 0; i < 7; i++) {
      const fecha = new Date(hoy);
      fecha.setDate(hoy.getDate() + i);
      const fechaStr = fecha.toISOString().slice(0, 10);

      const opciones: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'short' };
      const label = fecha.toLocaleDateString('es-ES', opciones);

      this.diasDisponibles.push({ fecha: fechaStr, label });
    }
  }

  cargarDisponibilidad(fecha: string): void {
    this.franjaSeleccionada = null;
    this.mensajeReserva = '';
    this.esReservaExitosa = null;
    this.mostrarConfirmacion = false;

    this.reservaService.obtenerDisponibilidad(fecha).subscribe({
      next: (data: DisponibilidadBackend) => {
        this.disponibilidadPistas = this.horasReserva.map(hora => {
          const disponibilidadHora = data.horas[hora] || { pista1: true, pista2: true, pista3: true, pista4: true };
          return { hora, ...disponibilidadHora };
        });
      },
      error: (error) => {
        console.error('Error al cargar la disponibilidad:', error);
        this.mensajeReserva = 'Error al cargar la disponibilidad.';
        this.esReservaExitosa = false;
      }
    });
  }

  seleccionarFecha(fecha: string): void {
    this.fechaSeleccionada = fecha;
    this.cargarDisponibilidad(fecha);
  }

  seleccionarFranja(hora: string, pista: string, disponible: boolean): void {
    this.mensajeReserva = '';
    this.esReservaExitosa = null;

    if (disponible) {
      this.franjaSeleccionada = { hora, pista };
      this.textoConfirmacion = `¿Deseas reservar la ${pista} a las ${hora}?`;
      this.mostrarConfirmacion = true;
    } else {
      this.franjaSeleccionada = null;
      this.mostrarConfirmacion = false;
    }
  }

  confirmarReserva(): void {
  if (!this.usuarioEmail) {
    this.mensajeReserva = 'Debes iniciar sesión para reservar.';
    this.esReservaExitosa = false;
    return;
  }

  if (this.franjaSeleccionada) {
    const { hora, pista } = this.franjaSeleccionada;
    const nuevaReserva: Reserva = {
      hora,
      pista,
      fecha: this.fechaSeleccionada,
      email: this.usuarioEmail,
    };

    this.reservaService.crearReserva(nuevaReserva).subscribe({
      next: () => {
        this.mensajeReserva = '¡Reserva realizada con éxito!';
        this.esReservaExitosa = true;
        this.cargarDisponibilidad(this.fechaSeleccionada);
        this.franjaSeleccionada = null;
        this.mostrarConfirmacion = false;
      },
      error: (error) => {
        console.error('Error al crear la reserva:', error);

        if (error.status === 409 && error.error?.detail?.includes('una reserva')) {
          this.mensajeReserva = 'Ya tienes una reserva para ese día.';
        } else if (error.status === 409 && error.error?.detail?.includes('pista ya está reservada')) {
          this.mensajeReserva = 'La pista ya está reservada en ese horario.';
        } else {
          this.mensajeReserva = 'Error al realizar la reserva. Inténtalo de nuevo.';
        }

        this.esReservaExitosa = false;
      }
    });
  } else {
    this.mensajeReserva = 'Por favor, selecciona una franja horaria libre para reservar.';
    this.esReservaExitosa = null;
  }
}
}
