import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { global } from './global';

@Injectable()
export class UserService {
  public urlApi: string

  constructor(
    public _http: HttpClient
  ) {
    this.urlApi = global.urlApi
  }

  /**
   * Registro de usuario   
   * @param user Datos del usuarios
   * @returns {Observable} Respuesta del API
   */
  register(user: User): Observable<any> {
    let user_data = JSON.stringify(user)
    let body_form_data = 'user=' + user_data

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')

    return this._http.post(this.urlApi + 'user', body_form_data, { headers: headers })
  }
}
