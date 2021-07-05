import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Playlist } from "../models/playlist";
import { TrackService } from "../services/track/track.service";
import { UsersService } from "../services/users/users.service";
import { PlaylistsPageActions } from "../store/actions";
import { AppState, selectUserPlaylists } from "../store/state/app.state";

@Component({
  selector: "ms-add-to-playlist-modal",
  templateUrl: "./add-to-playlist-modal.component.html",
  styleUrls: ["./add-to-playlist-modal.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddToPlaylistModalComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  playlists: Playlist[] = [];
  trackId: string;

  constructor(private store: Store<AppState>, private cdr: ChangeDetectorRef,
    private router: Router, private usersService: UsersService, private trackService: TrackService,
    private dialogRef: MatDialogRef<AddToPlaylistModalComponent>) {
    const url = this.router.url.split("/");
    this.trackId = url[url.length - 1];
  }

  ngOnInit(): void {
    const token = this.usersService.getFromLocStore("jwt-token");
    token && this.store.dispatch(PlaylistsPageActions.loadUserPlaylists({ token }));

    this.store.select(selectUserPlaylists).pipe(
      takeUntil(this.destroy$),
    ).subscribe((playlists) => {
      this.playlists = playlists;

      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onAdd(playlistId: string): void {
    const token = this.usersService.getFromLocStore("jwt-token");
    token && this.trackService.addToPlaylist(this.trackId, playlistId, token).pipe(
      takeUntil(this.destroy$),
    ).subscribe(() => {
      this.onClose();
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
