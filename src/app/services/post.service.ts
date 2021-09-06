import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { global } from './global';

@Injectable()
export class PostService {
    public urlApi: string

    constructor(
        private _http: HttpClient
    ) {
        this.urlApi = global.urlApi
    }

    /**
     * Show all posts             
     */
    index(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')

        return this._http.get(this.urlApi + 'post', { headers: headers })
    }


    /**
     * Store a newly created resource in storage.
     * 
     * @param token JWT
     * @param post Object for new post entryc               
     */
    store(token: string, post: any): Observable<any> {
        post.content = global.htmlEntities(post.content) // HTML entities to UTF8

        let post_data = JSON.stringify(post)
        let body_form_data = 'post=' + post_data
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token)

        return this._http.post(this.urlApi + 'post', body_form_data, { headers: headers })
    }

    /**
     * Specific post
     *      
     * @param post Object for new post entry
     * @returns {Observable} GET Response              
     */
    show(post_id: number): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')

        return this._http.get(this.urlApi + 'post/' + post_id, { headers: headers })
    }

    /**
     * Specific post
     * 
     * @param {string} token JWT
     * @param {Post} post Object for edit post entry
     * @param {number} post_id ID post to update
     * @returns {Observable} PUT Response              
     */
    update(token: string, post: Post, post_id: number): Observable<any> {
        post.content = global.htmlEntities(post.content) // HTML entities to UTF8

        let post_data = JSON.stringify(post)
        let body_form_data = 'post=' + post_data
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token)

        return this._http.put(this.urlApi + 'post/' + post_id, body_form_data, { headers: headers })
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param {string} token JWT
     * @param {number} post_id ID post to update
     * @returns {Observable} DELETE Response
     */
    destroy(token: string, post_id: number): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token)

        return this._http.delete(this.urlApi + 'post/' + post_id, { headers: headers })
    }
}
