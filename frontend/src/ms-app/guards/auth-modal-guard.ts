import { Injectable, OnDestroy } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { AppState, selectIsOpenAuthModal } from "../store/state/app.state";

@Injectable({
    providedIn: "root"
})
export class AuthModalGuard implements CanActivate, OnDestroy {

    returnUrl: string;
    isOpenAuthModal: boolean;
    private readonly destroy$: Subject<void> = new Subject();

    constructor(private store: Store<AppState>, private router: Router, private route: ActivatedRoute) {
        this.route.queryParams.subscribe((params) => {
            this.returnUrl = params.returnUrl;
        });
        this.store.select(selectIsOpenAuthModal).pipe(
            takeUntil(this.destroy$),
        ).subscribe((isOpenAuthModal) => {
            this.isOpenAuthModal = isOpenAuthModal;
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.isOpenAuthModal) {
            return true;
        }
        this.router.navigateByUrl(this.returnUrl);
        return false;
    }
}
