import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patrocinadores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patrocinadores.component.html',
  styleUrls: ['./patrocinadores.component.scss']
})
export class PatrocinadoresComponent {
  patrocinadores = [
    { nombre: '28 Gold', imagen: 'assets/patrocinadores/patro1.jpg' },
    { nombre: 'Charlotte Cáceres', imagen: 'assets/patrocinadores/patro2.jpg' },
    { nombre: 'Ciudad Deportiva de Cáceres', imagen: 'assets/patrocinadores/patro3.jpg' },
    { nombre: 'Ayuntamiento de Cáceres', imagen: 'assets/patrocinadores/patro4.jpg' },
    { nombre: 'Junta de Extremadura', imagen: 'assets/patrocinadores/patro5.jpg' },
    { nombre: 'Badén', imagen: 'assets/patrocinadores/patro6.jpg' }
  ];
}
