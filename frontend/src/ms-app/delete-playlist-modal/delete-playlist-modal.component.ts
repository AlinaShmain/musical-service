import { ChangeDetectionStrategy, Component, OnDestroy } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { UsersService } from "../services/users/users.service";
import { AuthActions } from "../store/actions";
import { AppState, selectIsDeleted } from "../store/state/app.state";

@Component({
  selector: "ms-delete-playlist-modal",
  templateUrl: "./delete-playlist-modal.component.html",
  styleUrls: ["./delete-playlist-modal.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeletePlaylistModalComponent implements OnDestroy {

  playlistId: string;

  private destroy$ = new Subject<void>();

  constructor(private dialogRef: MatDialogRef<DeletePlaylistModalComponent>, private router: Router,
    private usersService: UsersService, private store: Store<AppState>) {
    const url = this.router.url.split("/");
    this.playlistId = url[url.length - 1];
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onConfirm(): void {
    const token = this.usersService.getFromLocStore("jwt-token");
    token && this.store.dispatch(AuthActions.deletePlaylist({ playlistId: this.playlistId, token }));

    this.store.select(selectIsDeleted).pipe(
      takeUntil(this.destroy$),
    ).subscribe((isDeleted) => {
      if (isDeleted) {
        this.onClose(isDeleted);
      }
    });
  }

  onClose(isDeleted = false): void {
    this.dialogRef.close(isDeleted);
  }

}
