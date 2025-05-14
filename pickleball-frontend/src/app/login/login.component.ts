import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  isRegistering: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.isRegistering) {
      if (this.password !== this.confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }

      this.authService.register(this.email, this.password).subscribe({
        next: () => this.router.navigate(['/disponibilidad']),
        error: err => alert('Error al registrar: ' + err.message)
      });
    } else {
      this.authService.login(this.email, this.password).subscribe({
        next: () => this.router.navigate(['/disponibilidad']),
        error: err => alert('Error al iniciar sesión: ' + err.message)
      });
    }
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle()
      .then(() => this.router.navigate(['/disponibilidad']))
      .catch(err => alert('Error con Google: ' + err.message));
  }

  toggleMode() {
    this.isRegistering = !this.isRegistering;
    this.confirmPassword = ''; // limpia por si acaso
  }
}
