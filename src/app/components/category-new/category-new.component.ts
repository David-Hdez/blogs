import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css'],
  providers: [UserService, CategoryService]
})
export class CategoryNewComponent implements OnInit {
  public page_title: string
  public jwt: any
  public identity: any
  public category: Category
  public status: string

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _categoryService: CategoryService
  ) {
    this.page_title = 'Nueva Categoría'
    this.identity = this._userService.getIdentity()
    this.jwt = this._userService.getToken()
    this.category = new Category(1, '')
    this.status = ''
  }

  ngOnInit(): void {
  }

  /**
   * New Category
   */
  store(form: any) {
    this._categoryService.store(this.jwt, this.category).subscribe(
      response => {
        if (response.code == 201) {
          this.status = 'success'
          this.category = response.category

          this._router.navigate(['inicio'])
        } else {
          this.status = 'error'
        }
      },
      error => {
        this.status = 'error'
        console.error(<any>error)
      }
    )
  }

}
