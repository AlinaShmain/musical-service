import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { AuthModalComponent } from "../auth-modal/auth-modal.component";

@Component({
    selector: "ms-modal-entry",
    template: "",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalEntryComponent implements OnInit, OnDestroy {

    private destroy$ = new Subject<void>();

    constructor(public dialog: MatDialog, private router: Router,
        private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        console.log("modal entry");

        this.router.navigate([{ outlets: { popupContent: ["signIn"] } }]);
        this.openDialog();
    }

    ngOnDestroy(): void {
        console.log("on destroy modal entry");
        this.destroy$.next();
        this.destroy$.complete();
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(AuthModalComponent, {
            // width: '250px'
        });
        dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe((result) => {
            console.log("close dialog");
            this.router.navigateByUrl("/");
        });
    }

}
