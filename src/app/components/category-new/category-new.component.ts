import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Category } from '../../models/category';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css'],
  providers: [UserService]
})
export class CategoryNewComponent implements OnInit {
  public page_title: string
  public jwt: any
  public identity: any
  public category: Category

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = 'Nueva Categoría'
    this.identity = this._userService.getIdentity()
    this.jwt = this._userService.getToken()
    this.category = new Category(1, '')
  }

  ngOnInit(): void {
  }

  /**
   * New Category
   */
  store(form: any) {
    console.debug(this.category)
  }

}
