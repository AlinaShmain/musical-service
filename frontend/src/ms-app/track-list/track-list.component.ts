import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Track } from "../models/track";
import { TrackHeaders } from "../models/track-headers";
import { AudioService } from "../services/track/audio.service";
import { AudioActions, HomePageActions } from "../store/actions";
import { AppState, selectAudioState, selectTrackList } from "../store/state/app.state";
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
  tracks$: Track[] = [];
  audioState: AudioState;

  isOpenDropdown: boolean[] = [];

  private destroy$ = new Subject<void>();

  constructor(private store: Store<AppState>,
    private cdr: ChangeDetectorRef,
    private audioService: AudioService) { }

  ngOnInit(): void {
    console.log("init track list component");
    this.store.dispatch(HomePageActions.getTracks());

    this.store.select(selectTrackList).pipe(
      takeUntil(this.destroy$),
    ).subscribe((trackList) => {
      console.log("loaded tracks", trackList);
      this.tracks$ = [...trackList];
      this.cdr.markForCheck();
    });
    // TODO handle error

    this.store.select(selectAudioState).pipe(
      takeUntil(this.destroy$),
    ).subscribe((audioState) => {
      this.audioState = audioState;
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    console.log("destroy track list component");
    this.destroy$.next();
    this.destroy$.complete();
  }

  onLike(): void {

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

}
