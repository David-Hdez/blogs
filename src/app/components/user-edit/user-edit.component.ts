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
  public froala_options: Object = {
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
  };

  constructor(
    private _userService: UserService
  ) {
    this.page_title = 'Ajustes de usuario'
    this.status = ''
    this.identity = _userService.getIdentity()
    this.jwt = _userService.getToken()
    this.user = new User(
      this.identity.sub,
      this.identity.name,
      this.identity.surname,
      this.identity.role,
      this.identity.email,
      '',
      this.identity.description,
      this.identity.image)
  }

  ngOnInit(): void {
  }

  update(form: any) {
    this._userService.update(this.jwt, this.user).subscribe(
      response => {
        if (response && response.status) {
          this.status = 'success'

          // Updating user in the session
          this.user.name = response.updates.name
          this.user.surname = response.updates.surname
          this.user.email = response.updates.email
          this.user.description = response.updates.description

          this.identity = this.user
          localStorage.setItem('identity', JSON.stringify(this.identity))
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
