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

  constructor(
    private _userService: UserService
  ) {
    this.page_title = 'Ajustes de usuario'
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '')
    this.status = ''
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
