import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Provincia } from '../interface/provincia/provincia';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {

  uri= `${environment.apiBase}/provincia`

  http=inject(HttpClient)

  constructor() { }

  getByDepartamento(id: string):Observable<Provincia[]>{
    const uri_local=`${this.uri}/by-departamento?id=${id}`;
    return this.http.get<Provincia[]>(uri_local) ;
  }

   getAll():Observable<Provincia[]>{
    const uri_local=`${this.uri}/all`;
    return this.http.get<Provincia[]>(uri_local) ;
  }
  
}

