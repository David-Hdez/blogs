import { Component, OnInit } from '@angular/core';
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
    private _userService: UserService
  ) {
    this.page_title = 'Identifícate'
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '')
    this.status = ''
  }

  ngOnInit(): void {
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

}
