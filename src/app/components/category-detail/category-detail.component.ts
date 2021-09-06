import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Category } from '../../models/category';
import { Post } from '../../models/post';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';
import { UserService } from '../..//services/user.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css'],
  providers: [CategoryService, PostService, UserService]
})
export class CategoryDetailComponent implements OnInit {
  public title: string
  public category: Category
  public posts: Array<Post>
  public urlApi: string
  public identity: any
  public jwt: any

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _postService: PostService,
    private _userService: UserService,
    private _categoryService: CategoryService
  ) {
    this.title = 'Mostrando por categoría'
    this.category = <Category>{}
    this.posts = []
    this.urlApi = global.urlApi
    this.identity = this._userService.getIdentity()
    this.jwt = this._userService.getToken()
  }

  ngOnInit(): void {
    this.getPostsByCategory()
  }

  getPostsByCategory() {
    this._route.params.subscribe(params => {
      let category_id = +params['id']

      this._categoryService.show(category_id).subscribe(
        response => {
          if (response.code == 200) {
            this.category = response.category

            this._categoryService.showPosts(category_id).subscribe(
              response => {
                this.posts = response
              },
              error => {
                console.error(<any>error)
                this._router.navigate(['/inicio'])
              }
            )
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

  /**
   * Remove post
   */
  deletePost(id: number) {
    this._postService.destroy(this.jwt, id).subscribe(
      response => {
        this.getPostsByCategory()
      },
      error => {
        console.error(<any>error)
      }
    )
  }

}
