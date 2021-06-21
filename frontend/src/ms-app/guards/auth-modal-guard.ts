import { Injectable, OnDestroy } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { AppState, selectMainPageState } from "../store/state/app.state";
import { MainPageState } from "../store/state/main-page.state";

@Injectable({
    providedIn: "root"
})
export class AuthModalGuard implements CanActivate, OnDestroy {

    // returnUrl: string;
    mainPageState: MainPageState;
    private readonly destroy$: Subject<void> = new Subject();

    constructor(private store: Store<AppState>, private router: Router, private route: ActivatedRoute) {
        // this.route.queryParams.subscribe((params) => {
        //     this.returnUrl = params.returnUrl;
        // });
        this.store.select(selectMainPageState).pipe(
            takeUntil(this.destroy$),
        ).subscribe((mainPageState) => {
            this.mainPageState = mainPageState;
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.mainPageState.isOpenAuthModal) {
            return true;
        }
        this.router.navigateByUrl(this.mainPageState.returnUrl);
        return false;
    }
}
