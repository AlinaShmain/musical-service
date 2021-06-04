import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { AuthModalComponent } from "../auth-modal/auth-modal.component";
import { AuthActions } from "../store/actions";
import { AppState } from "../store/state/app.state";

@Component({
  selector: "ms-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();
  returnUrl: string;

  constructor(private route: ActivatedRoute, public dialog: MatDialog,
    private router: Router, private store: Store<AppState>) {
  }

  ngOnInit(): void {
    console.log("home component");
    console.log(this.router.url);
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.returnUrl = params.returnUrl;
    });
  }

  ngOnDestroy(): void {
    console.log("home on destroy");
    this.destroy$.next();
    this.destroy$.complete();
  }

  onOpen(): void {
    console.log("on open");
    this.store.dispatch(AuthActions.setIsOpenAuthModal({ isOpenAuthModal: true }));

    const dialogRef = this.dialog.open(AuthModalComponent, {});
    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe((result) => {
      console.log("after close modal");
      this.router.navigateByUrl(this.returnUrl);
    });
  }

}
