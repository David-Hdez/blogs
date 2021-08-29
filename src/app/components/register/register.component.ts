import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  public page_title: string
  public user: User

  constructor(
    private _userService: UserService
  ) {
    this.page_title = 'Registrate'
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '')
  }

  ngOnInit(): void {
    console.log('Compnente de registro cargado')
    console.log(this._userService.test())
  }

  register(form: any) {
    console.debug(form)
    console.debug(this.user)
    form.reset()
  }

}
