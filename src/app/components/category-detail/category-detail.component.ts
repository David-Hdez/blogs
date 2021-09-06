import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Category } from '../../models/category';
import { Post } from '../../models/post';
import { CategoryService } from '../../services/category.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css'],
  providers: [CategoryService]
})
export class CategoryDetailComponent implements OnInit {
  public title: string
  public category: Category
  public posts: Post
  public urlApi: string

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _categoryService: CategoryService
  ) {
    this.title = 'Mostrando por categoría'
    this.category = <Category>{}
    this.posts = <Post>{}
    this.urlApi = global.urlApi

  }

  ngOnInit(): void {
    this.getPostsByCategory()
  }

  /**
   * Charging the ID of category from URL param
   */
  getPostsByCategory() {
    this._route.params.subscribe(params => {
      let category_id = +params['id'] // Convert to number    

      this._categoryService.show(category_id).subscribe(
        response => {
          if (response.code == 200) {
            this.category = response.category
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
