import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AuthModalComponent } from "../../auth-modal/auth-modal.component";
import { AppState, selectReturnUrl } from "../../store/state/app.state";

@Injectable({
    providedIn: "root"
})
export class ModalService {

    private dialogRef: MatDialogRef<AuthModalComponent>;
    private returnUrl: string;

    constructor(private dialog: MatDialog, private router: Router, private store: Store<AppState>) {
        this.store.select(selectReturnUrl).pipe(
            // takeUntil(this.destroy$),
        ).subscribe((returnUrl) => {
            console.log("update returnUrl", returnUrl);
            this.returnUrl = returnUrl;
        });
    }

    setModalClose(): void {
        this.dialogRef.close();
    }

    openModal(): void {
        this.dialogRef = this.dialog.open(AuthModalComponent, {
            // width: '250px'
            disableClose: true,
        });

        this.dialogRef.afterClosed().pipe(
            // takeUntil(this.destroy$)
        ).subscribe((result) => {
            console.log("after close dialog", this.returnUrl);
            this.router.navigateByUrl(this.returnUrl);
            //     // this.router.navigate(["../"], { relativeTo: this.route });
            // this.router.navigate(
            // ["../"], { relativeTo: this.route });
        });
    }

}
