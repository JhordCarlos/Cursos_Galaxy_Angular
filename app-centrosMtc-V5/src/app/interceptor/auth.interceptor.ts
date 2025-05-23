import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService); // Inyección del servicio
  const authHeader = authService.getAuthHeader(); // Obtener el token almacenado

  // Clonar la petición con el encabezado de autorización
  const clonedReq = req.clone({
    setHeaders: { Authorization: authHeader }
  });
  return next(clonedReq); // Continuar con la petición modificada
};
