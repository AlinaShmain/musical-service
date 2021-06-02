import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import { UsersService } from "../services/users/users.service";

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
    private usersService: UsersService,
  ) {
  }

  ngOnInit(): void {
    console.log("init auth modal", this.usersService.isOpenAuthModal);
    if (this.usersService.isOpenAuthModal) {
      this.router.navigate(["./signIn"], { queryParams: { returnUrl: this.router.url }, relativeTo: this.route });
    } else {
      this.closeModal();
    }
  }

  ngOnDestroy(): void {
    console.warn("---- Dialog was destroyed ----");
    this.usersService.isOpenAuthModal = false;
    this.destroy$.next();
    this.destroy$.complete();
    this.dialogRef.close();
  }

  closeModal(): void {
    console.log("close modal");
    this.dialogRef.close();
  }

}
