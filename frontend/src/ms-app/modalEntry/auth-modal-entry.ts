import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { AuthModalComponent } from "../auth-modal/auth-modal.component";
import { AppState, selectReturnUrl } from "../store/state/app.state";

@Component({
    selector: "ms-modal-entry",
    template: "",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthModalEntryComponent implements OnInit, OnDestroy {

    private destroy$ = new Subject<void>();

    private dialogRef: MatDialogRef<AuthModalComponent>;
    private returnUrl: string;

    constructor(private dialog: MatDialog, private router: Router, private store: Store<AppState>) {
        this.store.select(selectReturnUrl).pipe(
            takeUntil(this.destroy$),
        ).subscribe((returnUrl) => {
            this.returnUrl = returnUrl;
        });
    }

    ngOnInit(): void {
        this.router.navigate([{ outlets: { popupContent: ["signIn"] } }]);
        this.openModal();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    openModal(): void {
        this.dialogRef = this.dialog.open(AuthModalComponent, {
            width: "400px",
            disableClose: true,
        });

        this.dialogRef.afterClosed().pipe(
            takeUntil(this.destroy$),
        ).subscribe((result) => {
            this.router.navigateByUrl(this.returnUrl);
        });
    }

}
