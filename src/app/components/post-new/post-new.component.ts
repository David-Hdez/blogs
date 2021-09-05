import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { Category } from '../../models/category';
import { global } from '../../services/global';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css'],
  providers: [UserService, CategoryService, PostService]
})
export class PostNewComponent implements OnInit {
  public page_title: string
  public identity: any
  public status: string
  public jwt: any
  public post: Post
  public categories: any
  public is_edit: boolean
  public options: Object = {
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
  };
  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.jpeg",
    maxSize: "20",
    uploadAPI: {
      url: global.urlApi + "post/image",
      method: "POST",
      headers: {
        "Authorization": this._userService.getToken()
      },
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    attachPinText: 'Selecciona tu avatar'
  };

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _postService: PostService
  ) {
    this.page_title = 'Crear una entrada'
    this.identity = this._userService.getIdentity()
    this.jwt = this._userService.getToken()
    this.post = new Post(1, this.identity.sub, 1, '', '', '', null)
    this.status = ''
    this.is_edit = false
  }

  ngOnInit(): void {
    this.getCategories()
  }

  /**
   * New Category
   */
  store(form: any) {
    this._postService.store(this.jwt, this.post).subscribe(
      response => {
        if (response.status == 'success') {
          this.status = 'success'
          this.post = response.created

          this._router.navigate(['/inicio'])
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

  /**
   * Load categories in selector
   */
  getCategories() {
    this._categoryService.index().subscribe(
      response => {
        if (response) {
          this.categories = response.categories
        }
      },
      error => {
        console.error(<any>error)
      }
    )
  }

  /**
   * Image for new blog
   */
  imageUpload(stored: any) {
    let image = JSON.parse(stored.response)

    this.post.image = image.avatar
  }

}
