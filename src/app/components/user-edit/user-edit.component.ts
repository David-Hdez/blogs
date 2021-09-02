import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {
  public page_title: string
  public user: User
  public status: string
  public jwt: any
  public identity: any

  constructor(
    private _userService: UserService
  ) {
    this.page_title = 'Ajustes de usuario'
    this.status = ''
    this.identity = _userService.getIdentity()
    this.jwt = _userService.getToken()
    this.user = this.identity
  }

  ngOnInit(): void {
  }

  update(form: any) {
    this._userService.register(this.user).subscribe(
      response => {
        if (response.status == 'success') {
          this.status = response.status

          form.reset()
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
