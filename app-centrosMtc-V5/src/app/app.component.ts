import { ChangeDetectorRef, Component, effect, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'app-centrosMtc';
  authService = inject(AuthService);
  cdr = inject(ChangeDetectorRef);
  router = inject(Router);
  accesoConcedido = this.authService.accesoConcedido;

  constructor() {
    this.authService.restoreSession();
    effect(() => {
      this.accesoConcedido(); // Detecta cambios de autenticación
      this.cdr.detectChanges(); // Forzar actualización de la vista
    });
  }

     
  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
