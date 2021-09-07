import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Post } from '../../models/post';
import { User } from 'src/app/models/user';
import { PostService } from '../../services/post.service';
import { UserService } from '../..//services/user.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [PostService, UserService]
})
export class ProfileComponent implements OnInit {
  public urlApi: string
  public posts: Array<Post>
  public user: User
  public identity: any
  public jwt: any

  constructor(
    private _postService: PostService,
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.urlApi = global.urlApi
    this.posts = []
    this.user = <User>{}
    this.identity = this._userService.getIdentity()
    this.jwt = this._userService.getToken()
  }

  ngOnInit(): void {
    this.getProfile()
  }

  /**
   * List posts for specific user           
   * 
   * @param {number} user_id ID of user
   */
  getPosts(user_id: number) {
    this._postService.showByUser(user_id).subscribe(
      response => {
        this.posts = response
      },
      error => {
        console.error(<any>error)
      }
    )
  }

  /**
   * Get the param of ID from URL params to get posts      
   */
  getProfile() {
    this._route.params.subscribe(params => {
      let user_id = +params['id'] // Convert to number   

      this.getUser(user_id)
      this.getPosts(user_id)
    })
  }

  /**
   * Show user meta
   */
  getUser(user_id: number) {
    this._userService.show(user_id).subscribe(
      response => {
        this.user = response.user
        this.user.image = response.user.img
      },
      error => {
        console.error(<any>error)
      }
    )
  }

  /**
   * Remove post
   * 
   * @param {number} post_id ID of post
   */
  deletePost(post_id: number) {
    this._postService.destroy(this.jwt, post_id).subscribe(
      response => {
        this.getProfile()
      },
      error => {
        console.error(<any>error)
      }
    )
  }

}
