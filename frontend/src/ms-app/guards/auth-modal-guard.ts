import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { UsersService } from "../services/users/users.service";

@Injectable({
    providedIn: "root"
})
export class AuthModalGuard implements CanActivate {

    returnUrl: string;

    constructor(private usersService: UsersService, private router: Router, private route: ActivatedRoute) {
        this.route.queryParams.subscribe((params) => {
            this.returnUrl = params.returnUrl;
        });
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        console.log("guard", this.usersService.isOpenAuthModal);
        if (this.usersService.isOpenAuthModal) {
            console.log("!!", this.usersService.isOpenAuthModal);
            return true;
        }
        this.router.navigateByUrl(this.returnUrl);
        return false;
    }
}
