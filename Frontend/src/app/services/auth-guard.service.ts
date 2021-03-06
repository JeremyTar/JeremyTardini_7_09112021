import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "./user.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private userService: UserService,
                private router: Router ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
            if(this.userService.isAuth) {
                return true
            } else {
                this.router.navigate(['/'])
                return false
            }
            
    }
}