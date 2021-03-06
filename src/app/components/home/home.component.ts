import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { UserService } from '../..//services/user.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PostService, UserService]
})
export class HomeComponent implements OnInit {
  public page_title: string
  public urlApi: string
  public posts: Array<Post>
  public identity: any
  public jwt: any

  constructor(
    private _postService: PostService,
    private _userService: UserService
  ) {
    this.page_title = 'Inicio'
    this.urlApi = global.urlApi
    this.posts = []
    this.identity = this._userService.getIdentity()
    this.jwt = this._userService.getToken()
  }

  ngOnInit(): void {
    this.getPosts()
  }

  /**
   * List posts                   
   */
  getPosts() {
    this._postService.index().subscribe(
      response => {
        this.posts = response.posts
      },
      error => {
        console.error(<any>error)
      }
    )
  }

  /**
   * Remove post
   */
  deletePost(id: number) {
    this._postService.destroy(this.jwt, id).subscribe(
      response => {
        this.getPosts()
      },
      error => {
        console.error(<any>error)
      }
    )
  }

}
