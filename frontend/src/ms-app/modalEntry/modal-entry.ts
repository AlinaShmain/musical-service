import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router, RouterOutlet } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { ModalService } from "../services/modal/modal.service";
import { AppState } from "../store/state/app.state";

@Component({
    selector: "ms-modal-entry",
    template: "",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalEntryComponent implements OnInit, OnDestroy {

    // private dialogRef: MatDialogRef<AuthModalComponent>;
    private destroy$ = new Subject<void>();
    @ViewChild(RouterOutlet) outlet: RouterOutlet;

    constructor(public dialog: MatDialog, private router: Router, private route: ActivatedRoute, private store: Store<AppState>, private _modalService: ModalService) {
    }

    ngOnInit(): void {
        console.log("modal entry", this.router.url.split("/"));
        // const routes = this.router.url.split("/");
        // const routesNum = routes.length;
        // this.store.dispatch(MainPageActions.setReturnUrl({ returnUrl: routes[routesNum - 2] }));
        this.router.navigate([{ outlets: { popupContent: ["signIn"] } }]); // , { skipLocationChange: true });
        // this.openDialog();
        this._modalService.openModal();
    }

    ngOnDestroy(): void {
        console.log("on destroy modal entry");
        this.destroy$.next();
        this.destroy$.complete();
        // this.closeModal();
    }

    // closeModal(): void {
    //     console.log("close modal");
    //     this.store.dispatch(MainPageActions.onCloseModal());
    //     this._modalService.setModalClose();
    // }

    // openDialog(): void {
    //     this.store.dispatch(MainPageActions.setIsOpenAuthModal({ isOpenAuthModal: true }));

    //     this.dialogRef = this.dialog.open(AuthModalComponent, {
    //         // width: '250px'
    //          disableClose: true,
    //     });
    //     this.dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe((result) => {
    //         console.log("close dialog", this.route);
    //         // this.router.navigate(["../"], { relativeTo: this.route });
    //         this.router.navigate(
    //             ["../"], { relativeTo: this.route });
    //         // ).then(() => this.router.navigate([
    //         //     ".",
    //         //     {
    //         //         outlets: {
    //         //             popupContent: null,
    //         //         },
    //         //     },
    //         // ]));
    //         // this.router.navigateByUrl("/");
    //     });
    // }

}
