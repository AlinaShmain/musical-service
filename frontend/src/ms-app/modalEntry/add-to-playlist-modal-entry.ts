import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { AddToPlaylistModalComponent } from "../add-to-playlist-modal/add-to-playlist-modal.component";

@Component({
    selector: "ms-modal-entry",
    template: "",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddToPlaylistModalEntryComponent implements OnInit, OnDestroy {

    private destroy$ = new Subject<void>();

    private dialogRef: MatDialogRef<AddToPlaylistModalComponent>;

    constructor(private dialog: MatDialog, private router: Router, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.openModal();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    openModal(): void {
        this.dialogRef = this.dialog.open(AddToPlaylistModalComponent, {
            width: "400px",
        });

        this.dialogRef.afterClosed().pipe(
            takeUntil(this.destroy$),
        ).subscribe((result) => {
            this.router.navigate(["../../"], { relativeTo: this.route });
        });
    }

}
