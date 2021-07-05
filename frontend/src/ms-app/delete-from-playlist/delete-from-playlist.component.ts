import { ChangeDetectionStrategy, Component, Inject, OnDestroy } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { DeletePlaylistModalComponent } from "../delete-playlist-modal/delete-playlist-modal.component";
import { UsersService } from "../services/users/users.service";
import { AuthActions } from "../store/actions";
import { AppState, selectIsDeletedFromPlaylist } from "../store/state/app.state";


interface Data {
  playlistId: string;
  trackId: string;
}

@Component({
  selector: "ms-delete-from-playlist",
  templateUrl: "./delete-from-playlist.component.html",
  styleUrls: ["./delete-from-playlist.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteFromPlaylistComponent implements OnDestroy {

  private destroy$ = new Subject<void>();

  constructor(private dialogRef: MatDialogRef<DeletePlaylistModalComponent>, @Inject(MAT_DIALOG_DATA) public data: Data,
    private usersService: UsersService, private store: Store<AppState>) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onConfirm(): void {
    const token = this.usersService.getFromLocStore("jwt-token");
    token && this.store.dispatch(AuthActions.deleteFromPlaylist({ playlistId: this.data.playlistId, trackId: this.data.trackId, token }));

    this.store.select(selectIsDeletedFromPlaylist).pipe(
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
