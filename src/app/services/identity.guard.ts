import { Injectable } from "@angular/core";
import { Router, CanActivate } from '@angular/router';
import { UserService } from "./user.service";

@Injectable()
export class IdentityGuard implements CanActivate {

    constructor(
        private _userService: UserService,
        private _router: Router
    ) { }

    canActivate() {
        let identity = this._userService.getIdentity()

        if (Object.keys(identity).length !== 0) {
            return true
        } else {
            this._router.navigate(['/error'])
            return false
        }

    }

}
