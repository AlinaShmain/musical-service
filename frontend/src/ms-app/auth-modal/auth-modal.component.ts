import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { AuthActions } from "../store/actions";
import { AppState, selectIsOpenAuthModal } from "../store/state/app.state";

@Component({
  selector: "ms-auth-modal",
  templateUrl: "./auth-modal.component.html",
  styleUrls: ["./auth-modal.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthModalComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();
  isOpenAuthModal: boolean;

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
      this.isOpenAuthModal = isOpenAuthModal;
    });
    if (this.isOpenAuthModal) {
      this.router.navigate(["./signIn"], { queryParams: { returnUrl: this.router.url }, relativeTo: this.route });
    } else {
      this.closeModal();
    }
  }

  ngOnDestroy(): void {
    console.warn("---- Dialog was destroyed ----");
    this.store.dispatch(AuthActions.setIsOpenAuthModal({ isOpenAuthModal: false }));
    this.destroy$.next();
    this.destroy$.complete();
    this.dialogRef.close();
  }

  closeModal(): void {
    console.log("close modal");
    this.dialogRef.close();
  }

}
