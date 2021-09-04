import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services//category.service';
import { Post } from '../../models/post';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css'],
  providers: [UserService, CategoryService]
})
export class PostNewComponent implements OnInit {
  public page_title: string
  public identity: any
  public jwt: any
  public post: Post

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _categoryService: CategoryService
  ) {
    this.page_title = 'Crear una entrada'
    this.identity = this._userService.getIdentity()
    this.jwt = this._userService.getToken()
    this.post = new Post(1, this.identity.sub, 1, '', '', '', null)
  }

  ngOnInit(): void {
  }

}
