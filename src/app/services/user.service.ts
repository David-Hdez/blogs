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
   * User register
   * @param user User data
   * @returns {Observable} API response
   */
  register(user: User): Observable<any> {
    let user_data = JSON.stringify(user)
    let body_form_data = 'user=' + user_data

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')

    return this._http.post(this.urlApi + 'user', body_form_data, { headers: headers })
  }

  /**
   * User login
   * @param user User data
   * @returns {Observable} API response
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

  /**
   * Get user info   
   */
  getIdentity() {
    let identity = JSON.parse(localStorage.getItem('identity') || '{}')

    if (identity && identity != 'undefined') {
      this.identity = identity
    } else {
      this.identity = null
    }

    return this.identity
  }

  /**
   * Get user JWT
   */
  getToken() {
    let token = localStorage.getItem('token')

    if (token && token != 'undefined') {
      this.token = token
    } else {
      this.token = null
    }

    return this.token
  }

  /**
   * Update user info
   * 
   * @param token JWT
   * @param user User object
   * @returns {Observable} API response
   */
  update(token: any, user: any): Observable<any> {
    user.description = global.htmlEntities(user.description) // HTML entities to UTF8

    let user_data = JSON.stringify(user)
    let body_form_data = 'user=' + user_data
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token)

    return this._http.put(this.urlApi + 'user', body_form_data, { headers: headers })
  }
}
