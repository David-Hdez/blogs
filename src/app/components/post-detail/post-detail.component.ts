import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Post } from '../../models/post';
import { Category } from '../../models/category';
import { User } from '../../models/user';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [PostService]
})
export class PostDetailComponent implements OnInit {
  public post: Post
  public user: User
  public category: Category

  constructor(
    private _postService: PostService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.post = <Post>{}
    this.user = <User>{}
    this.category = <Category>{}
  }

  ngOnInit(): void {
    this.getPost()
  }

  /**
   * Show post        
   */
  getPost() {
    this._route.params.subscribe(params => {
      let post_id = +params['id'] // Convert to number    

      this._postService.show(post_id).subscribe(
        response => {
          if (response.code == 200) {
            this.post = response.post
            this.category = response.post.category
            this.user = response.post.user
          } else {
            this._router.navigate(['/inicio'])
          }
        },
        error => {
          console.error(<any>error)
          this._router.navigate(['/inicio'])
        }
      )
    })
  }

}
