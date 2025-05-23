import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { CentroMedico } from '../interface/centros/centromedico';
import { Centromedicorequest } from '../interface/centros/centromedicorequest';

@Injectable({
  providedIn: 'root',
})
export class CentromedicoService {
  uri = `${environment.apiBase}/centromedico`;

  http = inject(HttpClient);

  constructor() {}

  getAll(): Observable<CentroMedico[]> {
    const uri_local = `${this.uri}/all`;
    return this.http.get<CentroMedico[]>(uri_local);
  }


  getByRuc(ruc: string): Observable<CentroMedico> {
    const uri_local = `${this.uri}/by-ruc?ruc=${ruc}`;
    return this.http.get<CentroMedico>(uri_local);
  }

  getByUbigeo(
    departamentoId: string,
    provinciaId: string,
    distritoId: string
  ): Observable<HttpResponse<CentroMedico[]>> {
    let uri_local = ``;

    if (departamentoId != '0' && provinciaId == '0' && distritoId == '0') {
      uri_local = `${this.uri}/by-departamento?id=${departamentoId}`;
    }

    if (departamentoId != '0' && provinciaId != '0' && distritoId == '0') {
      uri_local = `${this.uri}/by-provincia?id=${provinciaId}`;
    }

    if (departamentoId != '0' && provinciaId != '0' && distritoId != '0') {
      uri_local = `${this.uri}/by-distrito?id=${distritoId}`;
    }
    return this.http.get<CentroMedico[]>(uri_local,{ observe: 'response' });
  }

  add(centromedico: Centromedicorequest): Observable<HttpResponse<any>> {
    return this.http.post(this.uri, centromedico, { observe: 'response' });
  }

  update(
    ruc: string,
    centromedico: Centromedicorequest
  ): Observable<HttpResponse<any>> {
    const uri_local = `${this.uri}/${ruc}`;
    return this.http.put(uri_local, centromedico, { observe: 'response' });
  }

  delete(ruc?: string): Observable<HttpResponse<any>> {
    const uri_local = `${this.uri}/${ruc}`;
    return this.http.delete(uri_local, { observe: 'response' });
  }
}
