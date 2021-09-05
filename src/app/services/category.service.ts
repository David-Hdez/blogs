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

    /**
     * Show Categories
     * 
     * @returns {Observable} get Response
     */
    index(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')

        return this._http.get(this.urlApi + 'category', { headers: headers })
    }

    /**
     * New Category
     * 
     * @param {string} token JWT
     * @returns {Observable} POST Response
     */
    store(token: string, category: any): Observable<any> {
        let category_data = JSON.stringify(category)
        let body_form_data = 'category=' + category_data
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token)

        return this._http.post(this.urlApi + 'category', body_form_data, { headers: headers })
    }

    /**
     * View specific category
     * 
     * @param {number} category_id ID of category
     * @returns {Observable} GET Response
     */
    show(category_id: number): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')

        return this._http.get(this.urlApi + 'category/' + category_id, { headers: headers })
    }

    /**
     * View specific category
     * 
     * @param {number} category_id ID of category
     * @returns {Observable} GET Response
     */
    showPosts(category_id: number): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')

        return this._http.get(this.urlApi + 'post/category/' + category_id, { headers: headers })
    }

}
