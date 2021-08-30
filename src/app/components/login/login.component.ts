import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public page_title: string
  public user: User
  public status: string
  public jwt: any
  public identity: any

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = 'Identifícate'
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '')
    this.status = ''
  }

  ngOnInit(): void {
    this.logout() // Get param sure in the route
  }

  login(form: any) {
    this._userService.signup(this.user).subscribe(
      response => {
        if (response.status != 'error') {
          this.status = 'success'
          this.jwt = response

          this._userService.signup(this.user, true).subscribe(
            response => {
              this.identity = response

              localStorage.setItem('token', this.jwt)
              localStorage.setItem('identity', JSON.stringify(this.identity))

              this._router.navigate(['inicio'])
            },
            error => {
              this.status = 'error'
              console.error('Identity', <any>error)
            }
          )
        } else {
          this.status = 'error'
        }
      },
      error => {
        this.status = 'error'
        console.error('Token', <any>error)
      }
    )
  }

  logout() {
    this._route.params.subscribe(params => {
      let close_session = +params['sure']

      if (close_session == 1) {
        localStorage.removeItem('identity')
        localStorage.removeItem('token')

        this.identity = null
        this.jwt = null

        this._router.navigate(['inicio'])
      }
    })
  }

}
