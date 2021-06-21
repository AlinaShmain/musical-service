import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { AuthModalComponent } from "../auth-modal/auth-modal.component";

@Component({
    selector: "ms-modal-entry",
    template: "",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalEntryComponent implements OnInit, OnDestroy {

    private dialogRef: MatDialogRef<AuthModalComponent>;
    private destroy$ = new Subject<void>();

    constructor(public dialog: MatDialog, private router: Router) {
    }

    ngOnInit(): void {
        console.log("modal entry");

        this.router.navigate([{ outlets: { popupContent: ["signIn"] } }]);
        this.openDialog();
    }

    ngOnDestroy(): void {
        console.log("on destroy modal entry");
        this.closeModal();
    }

    closeModal(): void {
        console.log("close modal");
        // this.store.dispatch(MainPageActions.setIsOpenAuthModal({ isOpenAuthModal: false }));
        this.destroy$.next();
        this.destroy$.complete();
        this.dialogRef.close();
      }

    openDialog(): void {
        this.dialogRef = this.dialog.open(AuthModalComponent, {
            // width: '250px'
        });
        this.dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe((result) => {
            console.log("close dialog");
            this.router.navigateByUrl("/");
        });
    }

}
