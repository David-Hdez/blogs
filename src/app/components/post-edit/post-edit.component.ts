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
  templateUrl: '../post-new/post-new.component.html', // Same view, will be reused
  styleUrls: ['../post-new/post-new.component.css'],
  providers: [UserService, CategoryService, PostService]
})
export class PostEditComponent implements OnInit {
  public page_title: string
  public identity: any
  public status: string
  public jwt: any
  public post: Post
  public categories: any
  public is_edit: boolean
  public options: Object = {
    charCounterCount: true,
    language: 'es',
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat'],
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
    this.page_title = 'Editar entrada'
    this.identity = this._userService.getIdentity()
    this.jwt = this._userService.getToken()
    this.post = <Post>{}
    this.status = ''
    this.getPost()
    this.is_edit = true
  }

  ngOnInit(): void {
    this.getCategories()
  }

  /**
   * New Category
   */
  store(form: any) {
    this._postService.update(this.jwt, this.post, this.post.id).subscribe(
      response => {
        if (response.status == 'updated') {
          this.status = 'success'

          this._router.navigate(['/entrada', this.post.id])
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

  /**
   * Post to edit
   */
  getPost() {
    this._route.params.subscribe(params => {
      let post_id = +params['id'] // Convert to number    

      this._postService.show(post_id).subscribe(
        response => {
          if (response.code == 200) {
            this.post = response.post

            if (this.post.user_id !== this.identity.sub) {
              this._router.navigate(['/inicio'])
            }
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
