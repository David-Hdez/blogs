import { Component } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent {
  title = 'blogs';
  public identity: any
  public token: any

  constructor(
    public _userService: UserService
  ) {
    this.identity = _userService.getIdentity()
    console.debug(this.identity)
  }
}
