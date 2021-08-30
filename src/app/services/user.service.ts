import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { global } from './global';

@Injectable()
export class UserService {
  public urlApi: string
  public identity: any
  public token: any

  constructor(
    public _http: HttpClient
  ) {
    this.urlApi = global.urlApi
  }

  /**
   * Registro de usuario   
   * @param user Datos del usuario
   * @returns {Observable} Respuesta del API
   */
  register(user: User): Observable<any> {
    let user_data = JSON.stringify(user)
    let body_form_data = 'user=' + user_data

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')

    return this._http.post(this.urlApi + 'user', body_form_data, { headers: headers })
  }

  /**
   * Login de usuario   
   * @param user Datos del usuario
   * @returns {Observable} Respuesta del API
   */
  signup(user: any, getToken: any = null): Observable<any> {
    if (getToken != null) {
      user.getToken = 'true'
    }

    let user_data = JSON.stringify(user)
    let body_form_data = 'user=' + user_data
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')

    return this._http.post(this.urlApi + 'user/login', body_form_data, { headers: headers })
  }

  getIdentity() {
    let identity = JSON.parse(localStorage.getItem('identity') || '{}')

    if (identity && identity != 'undefined') {
      this.identity = identity
    } else {
      this.identity = null
    }

    return this.identity
  }

  getToken() {
    let token = JSON.parse(localStorage.getItem('token') || '{}')

    if (token && token != 'undefined') {
      this.token = token
    } else {
      this.token = null
    }

    return this.token
  }
}
