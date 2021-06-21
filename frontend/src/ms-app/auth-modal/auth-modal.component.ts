import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { MainPageActions } from "../store/actions";
import { AppState, selectIsOpenAuthModal } from "../store/state/app.state";

@Component({
  selector: "ms-auth-modal",
  templateUrl: "./auth-modal.component.html",
  styleUrls: ["./auth-modal.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthModalComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<AuthModalComponent>,
    private store: Store<AppState>,
  ) {
  }

  ngOnInit(): void {
    console.log("init auth modal");
    this.store.select(selectIsOpenAuthModal).pipe(
      takeUntil(this.destroy$),
    ).subscribe((isOpenAuthModal) => {
      if (isOpenAuthModal) {
        console.log(this.router.url);
        this.store.dispatch(MainPageActions.setReturnUrl({ returnUrl: this.router.url }));
        this.router.navigateByUrl("/signIn");
        // this.router.navigate(["./signIn"], { relativeTo: this.route }); // { queryParams: { returnUrl: this.router.url }, relativeTo: this.route });
      } else {
        this.closeModal();
      }
    });

  }

  ngOnDestroy(): void {
    console.warn("---- Dialog was destroyed ----");
    this.closeModal();
    // this.store.dispatch(MainPageActions.setIsOpenAuthModal({ isOpenAuthModal: false }));
    // this.destroy$.next();
    // this.destroy$.complete();
    // this.dialogRef.close();
  }

  closeModal(): void {
    console.log("close modal");
    this.store.dispatch(MainPageActions.setIsOpenAuthModal({ isOpenAuthModal: false }));
    this.destroy$.next();
    this.destroy$.complete();
    this.dialogRef.close();
  }

}
