import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Distrito } from '../interface/distrito/distrito';

@Injectable({
  providedIn: 'root'
})
export class DistritoService {

  uri= `${environment.apiBase}/distrito`

  http=inject(HttpClient)

  constructor() { }

  getByProvincia(id: string):Observable<Distrito[]>{
    const uri_local=`${this.uri}/by-provincia?id=${id}`;
    return this.http.get<Distrito[]>(uri_local) ;
  }

   getAll():Observable<Distrito[]>{
    const uri_local=`${this.uri}/all`;
    return this.http.get<Distrito[]>(uri_local) ;
  }
  
}
