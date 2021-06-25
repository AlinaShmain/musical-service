import { Injectable, OnDestroy } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { UsersService } from "../services/users/users.service";
import { AppState, selectReturnUrl } from "../store/state/app.state";

@Injectable({
  providedIn: "root"
})
export class NegateAuthGuard implements CanActivate, OnDestroy {

  returnUrl: string;
  private readonly destroy$: Subject<void> = new Subject();

  // constructor(private _authGuard: AuthGuard) { }
  constructor(private store: Store<AppState>, private router: Router, private usersService: UsersService) {
    this.store.select(selectReturnUrl).pipe(
      takeUntil(this.destroy$),
    ).subscribe((returnUrl) => {
      this.returnUrl = returnUrl;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // console.log(!this._authGuard.canActivate(route, state));
    // return !this._authGuard.canActivate(route, state);

      if (this.usersService.isAuthenticated()) {
        this.router.navigateByUrl(this.returnUrl);

        return false;
      }

      return true;
  }
}
