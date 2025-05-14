import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss']
})
export class NoticiasComponent {
  noticias = [
    {
      titulo: 'Jornada de Puertas Abiertas 8 de Abril',
      descripcion: 'Queremos que en Cáceres se juegue al Pickleball. Volvemos a la carga , esta vez en la Residencia Universitaria Diego Muñoz Torrero, donde podrás venir a conocer este apasionante deporte',
      imagen: 'assets/noticias/noticia1.jpg'
    },
    {
      titulo: 'Jornadas de Puertas Abiertas Real Club de Tenis Cabezarrubia',
      descripcion: 'Vuelve el Pickleball a Cáceres , esta vez de la mano de Real Club de Tenis Cabezarrubia con el apoyo de la AEXTPB. Te esperamos el sábado 14 de diciembre desde las 10 de la mañana',
      imagen: 'assets/noticias/noticia2.jpg'
    },
    {
      titulo: 'Jornadas de Puertas Abiertas Sábado 18 de mayo',
      descripcion: 'El sábado tienes una cita en la Ciudad Deportiva de Cáceres para conocer este maravilloso deporte.',
      imagen: 'assets/noticias/noticia4.jpg'
    },
    {
      titulo: 'Nace el Pickle Pro Tour, el circuito nacional oficial de Pickleball',
      descripcion: 'Este lunes se ha presentado en sociedad el Pickle Pro Tour, el primer circuito nacional oficial de pickleball en España que nace bajo el auspicio de la Real Federación Española de Tenis y organizado por la empresa B3 Sportainment con Cervezas Victoria',
      imagen: 'assets/noticias/noticia3.jpg'
    },
    {
      titulo: 'Jornada de Puertas Abiertas en Mohedas de Granadilla',
      descripcion: 'Ven a disfrutar del deporte de moda en Mohedas de Granadilla 🇪🇸 el 23 de Diciembre. Para todas las edades, te dejamos el material, solo tienes que disfrutar de este magnífico deporte. Te esperamos en el Pabellón multiusos',
      imagen: 'assets/noticias/noticia5.jpg'
    },
    {
      titulo: '¡Pickleball en tu colegio!',
      descripcion: 'Iremos a enseñar este apasionante deporte al CEIP DONOSO CORTÉS de Cáceres, el Jueves 2 Mayo. El Pickleball es una gran opción para incluir en las clases de EF , fácil de aprender para los alumnos y con poco material para su práctica.',
      imagen: 'assets/noticias/noticia6.jpg'
    }
  ];

  selectedImage: string | null = null;

  openImage(imagen: string) {
    this.selectedImage = imagen;
  }

  closeImage() {
    this.selectedImage = null;
  }
}