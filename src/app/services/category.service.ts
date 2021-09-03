import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { global } from './global';

@Injectable()
export class CategoryService {
    public urlApi: string

    constructor(
        private _http: HttpClient
    ) {
        this.urlApi = global.urlApi
    }

    store(token: string, category: any): Observable<any> {
        let category_data = JSON.stringify(category)
        let body_form_data = 'category=' + category_data
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token)

        return this._http.post(this.urlApi + 'category', body_form_data, { headers: headers })
    }
}
