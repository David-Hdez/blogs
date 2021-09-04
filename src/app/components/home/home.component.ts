import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PostService]
})
export class HomeComponent implements OnInit {
  public page_title: string
  public urlApi: string
  public posts: Array<Post>

  constructor(
    private _postService: PostService
  ) {
    this.page_title = 'Inicio'
    this.urlApi = global.urlApi
    this.posts = []
  }

  ngOnInit(): void {
    this.getPosts()
  }

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

}
