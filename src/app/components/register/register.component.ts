import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public page_title: string
  public user: User

  constructor() {
    this.page_title = 'Registrate'
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '')
  }

  ngOnInit(): void {
    console.log('Compnente de registro cargado')
  }

  register(form: any) {
    console.debug(form)
    console.debug(this.user)
    form.reset()
  }

}
