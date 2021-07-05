import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { DeleteFromPlaylistComponent } from "../delete-from-playlist/delete-from-playlist.component";
import { Track } from "../models/track";
import { TrackHeaders } from "../models/track-headers";
import { AudioService } from "../services/track/audio.service";
import { UsersService } from "../services/users/users.service";
import { AudioActions, AuthActions } from "../store/actions";
import { AppState, selectAudioState } from "../store/state/app.state";
import { AudioState } from "../store/state/audio.state";

@Component({
  selector: "ms-track-list",
  templateUrl: "./track-list.component.html",
  styleUrls: ["./track-list.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackListComponent implements OnInit, OnDestroy {

  headers: TrackHeaders = {
    title: "Title",
    artist: "Artist",
    duration: "Duration",
  };
  audioState: AudioState;
  returnUrl: string;

  isOpenDropdown: boolean[] = [];
  isFavourite: boolean[] = [];
  playlistId: string;

  private dialogRef: MatDialogRef<DeleteFromPlaylistComponent>;

  private destroy$ = new Subject<void>();

  constructor(private store: Store<AppState>,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private audioService: AudioService,
    private usersService: UsersService,
    public dialog: MatDialog) {
    const url = this.router.url.split("/");
    this.playlistId = url[url.length - 1];
  }

  ngOnInit(): void {
    this.store.select(selectAudioState).pipe(
      takeUntil(this.destroy$),
    ).subscribe((audioState) => {
      this.audioState = audioState;
      if (this.usersService.isAuthenticated()) {
        this.audioState.currTrackList.forEach((track, idx) => this.isFavourite[idx] = this.isInFavourites(track));
      } else {
        this.isFavourite = [];
      }
      this.cdr.markForCheck();
    });

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDropdown(idx: number): void {
    this.isOpenDropdown[idx] = !this.isOpenDropdown[idx];
  }

  onTrackClick(track: Track): void {
    if (track.id === this.audioState?.trackId) {
      this.audioState?.isPlaying ? this.onPause() : this.onResume();
    } else {
      this.onPlay(track);
    }
  }

  onPlay(track: Track): void {
    if (this.audioState.bufferSource) {
      this.audioService.pausePlaying(this.audioState.bufferSource);
      this.audioService.resetTrackData();
    }

    this.store.dispatch(AudioActions.playTrack({ track }));

  }

  onResume(): void {
    this.store.dispatch(AudioActions.resumePlaying({
      currentTime: this.audioState.currentTime,
      audioBuffer: this.audioState.audioBuffer,
    }));
  }

  onPause(): void {
    this.audioService.pausePlaying(this.audioState.bufferSource);
  }

  isInFavourites(track: Track): boolean {
    // if (!this.usersService.isAuthenticated()) {
    //   return false;
    // }

    const favouritesIds: string[] = this.usersService.getFavourites();

    return favouritesIds?.includes(track.id);
  }

  onLike(track: Track, idx: number): void {
    if (this.usersService.isAuthenticated()) {

      const token = this.usersService.getFromLocStore("jwt-token");

      if (this.isInFavourites(track)) {
        this.isFavourite[idx] = false;
        this.store.dispatch(AuthActions.dislikeTrack({ trackId: track.id, token }));
      } else {
        this.isFavourite[idx] = true;
        this.store.dispatch(AuthActions.likeTrack({ trackId: track.id, token }));
      }

    } else {
      this.router.navigateByUrl("/main/form");
    }
  }

  isAuthenticated(): boolean {
    return this.usersService.isAuthenticated();
  }

  isUserPlaylist(playlistId: string): boolean {
    const playlistIds: string[] = this.usersService.getPlaylistIds();

    return playlistIds?.includes(playlistId);
  }

  isShown(): boolean {
    return this.isAuthenticated() && this.isUserPlaylist(this.playlistId);
  }

  onOpenDeleteModal(trackId: string, index: number): void {
    this.dialogRef = this.dialog.open(DeleteFromPlaylistComponent, {
      width: "400px",
      data: {
        trackId,
        playlistId: this.playlistId,
      }
    });

    this.dialogRef.afterClosed().pipe(
      takeUntil(this.destroy$),
    ).subscribe((isDeleted) => {
      if (isDeleted) {
        this.isOpenDropdown[index] = false;
        this.cdr.markForCheck();
      }
    });
  }

}
