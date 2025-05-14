import { Injectable, inject, signal } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
  User
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);

  currentUser = signal<User | null>(null);

  // Verificar si el entorno es navegador
  private isBrowser: boolean = typeof window !== 'undefined';

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      this.currentUser.set(user);
      if (user?.email && this.isBrowser) {
        localStorage.setItem('usuarioEmail', user.email);
      } else if (this.isBrowser) {
        localStorage.removeItem('usuarioEmail');
      }
    });
  }

  register(email: string, password: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  login(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      map((cred) => {
        if (cred.user?.email && this.isBrowser) {
          localStorage.setItem('usuarioEmail', cred.user.email);
        }
        return cred;
      })
    );
  }

  logout(): Promise<void> {
    if (this.isBrowser) {
      localStorage.removeItem('usuarioEmail');
    }
    return signOut(this.auth);
  }

  loginWithGoogle(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider).then(cred => {
      if (cred.user?.email && this.isBrowser) {
        localStorage.setItem('usuarioEmail', cred.user.email);
      }
      return cred;
    });
  }

  getUser(): Observable<User | null> {
    return new Observable(subscriber => {
      onAuthStateChanged(this.auth, (user) => {
        subscriber.next(user);
      });
    });
  }

  isAuthenticated(): Observable<boolean> {
    return this.getUser().pipe(map(user => !!user));
  }

  getEmail(): string | null {
    if (this.isBrowser) {
      return this.auth.currentUser?.email ?? localStorage.getItem('usuarioEmail');
    }
    return null;
  }
}
