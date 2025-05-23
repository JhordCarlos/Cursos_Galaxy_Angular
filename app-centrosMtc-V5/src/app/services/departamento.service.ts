import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Departamento } from '../interface/departamento/departamento';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  uri= `${environment.apiBase}/departamento`

  http=inject(HttpClient)

  constructor() { }

  getAll():Observable<Departamento[]>{
    const uri_local=`${this.uri}/all`;
    return this.http.get<Departamento[]>(this.uri + "/all") ;
  }
  
}
