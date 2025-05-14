import { Routes } from '@angular/router';
import { DisponibilidadCalendarioComponent } from './disponibilidad-calendario/disponibilidad-calendario.component';
import { PortadaComponent } from './portada/portada.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { InfoComponent } from './info/info.component';
import { PatrocinadoresComponent } from './patrocinadores/patrocinadores.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'portada', pathMatch: 'full' },
  { path: 'portada', component: PortadaComponent },
  { path: 'disponibilidad', component: DisponibilidadCalendarioComponent },
  { path: 'noticias', component: NoticiasComponent },
  { path: 'info', component: InfoComponent },
  { path: 'patrocinadores', component: PatrocinadoresComponent },
  { path: 'login', component: LoginComponent }
];
