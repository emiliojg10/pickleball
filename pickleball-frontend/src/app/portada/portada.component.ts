import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-portada',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './portada.component.html',
  styleUrls: ['./portada.component.scss']
})
export class PortadaComponent {
  noticias = [
    {
      titulo: 'Jornada en Cáceres',
      descripcion: 'Descubre nuestra jornada en la Residencia Universitaria.',
      imagen: 'assets/noticias/noticia1.jpg'
    },
    {
      titulo: 'Pickleball en colegios',
      descripcion: 'Promovemos el deporte en centros educativos.',
      imagen: 'assets/noticias/noticia6.jpg'
    },
    {
      titulo: 'Nueva sede de juego',
      descripcion: 'Abrimos un nuevo espacio para jugar en Cabezarrubia.',
      imagen: 'assets/noticias/noticia2.jpg'
    }
  ];

  patrocinadores = [
    { nombre: '28 Gold', imagen: 'assets/patrocinadores/patro1.jpg' },
    { nombre: 'Charlotte Cáceres', imagen: 'assets/patrocinadores/patro2.jpg' },
    { nombre: 'Ciudad Deportiva de Cáceres', imagen: 'assets/patrocinadores/patro3.jpg' }
  ];
}
