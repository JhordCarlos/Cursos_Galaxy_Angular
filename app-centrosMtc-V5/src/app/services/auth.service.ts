import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { tap } from 'rxjs/internal/operators/tap';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  uri = `${environment.apiBase}/login`;
  http = inject(HttpClient);
  authHeader = signal(sessionStorage.getItem('authHeader') || '');
  accesoConcedido = signal(!!this.authHeader()); // Si hay token, se concede acceso
  //private acceso = new BehaviorSubject<boolean>(false);

  login(username: string, password: string) {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(`${username}:${password}`),
    });
    
    this.authHeader.set(headers.get('Authorization') || '');
    return this.http.get(this.uri, { headers }).pipe(
      tap(() => {
        sessionStorage.setItem('authHeader', headers.get('Authorization') || ''); // Guardar en sesión
        this.accesoConcedido.set(true);
      }),
      catchError((error) => {
       console.error('Error en autenticación', error);
        this.logout(); // Borrar credenciales en caso de error
        return throwError(() => new Error('Error en login'));
      })
    );
  }

  getAuthHeader() {
    return this.authHeader();
  }

  logout() {
    this.authHeader.set('');
    this.accesoConcedido.set(false);
    sessionStorage.removeItem('authHeader'); // Eliminar almacenamiento
  }

  restoreSession() {
  const storedHeader = localStorage.getItem('authHeader');
  if (storedHeader) {
    this.authHeader.set(storedHeader);
    this.accesoConcedido.set(true);
  }
}


}
