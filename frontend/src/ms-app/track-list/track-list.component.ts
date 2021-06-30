import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
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
    // album: "Album",
    duration: "Duration",
  };
  // tracks$: Track[] = [];
  audioState: AudioState;
  returnUrl: string;

  isOpenDropdown: boolean[] = [];
  isFavourite: boolean[] = [];

  private destroy$ = new Subject<void>();

  constructor(private store: Store<AppState>,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private audioService: AudioService,
    private usersService: UsersService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    console.log("init track list component");

    this.store.select(selectAudioState).pipe(
      takeUntil(this.destroy$),
    ).subscribe((audioState) => {
      this.audioState = audioState;
      if (this.usersService.isAuthenticated()) {
        this.audioState.currTrackList.forEach((track, idx) => this.isFavourite[idx] = this.isInFavourites(track));
      } else {
        this.isFavourite = [];
      }
      // console.log("!!!!", this.isFavourite);
      this.cdr.markForCheck();
    });

  }

  ngOnDestroy(): void {
    console.log("destroy track list component");
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDropdown(idx: number): void {
    this.isOpenDropdown[idx] = !this.isOpenDropdown[idx];
  }

  onTrackClick(track: Track): void {
    if (track.id === this.audioState?.trackId) {
      console.log("same track");
      this.audioState?.isPlaying ? this.onPause() : this.onResume();
    } else {
      this.onPlay(track);
    }
  }

  onPlay(track: Track): void {
    console.log("on play", track);

    if (this.audioState.bufferSource) {
      console.log("interrupt playing");
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
    console.log("on pause");
    this.audioService.pausePlaying(this.audioState.bufferSource);
  }

  isInFavourites(track: Track): boolean {
    // if (!this.usersService.isAuthenticated()) {
    //   return false;
    // }

    const favouritesIds: string[] = this.usersService.getFavourites();
    console.log("favouritesIds", favouritesIds);

    return favouritesIds?.includes(track.id);
  }

  onLike(track: Track, idx: number): void {
    if (this.usersService.isAuthenticated()) {

      const token = this.usersService.getFromLocStore("jwt-token");

      if (this.isInFavourites(track)) {
        console.log("unlike");
        this.isFavourite[idx] = false;
        this.store.dispatch(AuthActions.dislikeTrack({ trackId: track.id, token }));
      } else {
        console.log("like");
        this.isFavourite[idx] = true;
        this.store.dispatch(AuthActions.likeTrack({ trackId: track.id, token }));
      }

    } else {
      this.router.navigateByUrl("/main/form");
    }
  }

}
