import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Track } from "../models/track";
import { AudioService } from "../services/track/audio.service";
import { AudioActions } from "../store/actions";
import { AppState, selectAudioState } from "../store/state/app.state";
import { AudioState } from "../store/state/audio.state";

@Component({
  selector: "ms-player",
  templateUrl: "./player.component.html",
  styleUrls: ["./player.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();
  audioState: AudioState;

  constructor(private store: Store<AppState>, private cdr: ChangeDetectorRef, private audioService: AudioService) { }

  ngOnInit(): void {
    console.log("player component init");

    this.store.select(selectAudioState).pipe(
      takeUntil(this.destroy$),
    ).subscribe((audioState) => {

      if (audioState.isEnded) {
        const nextTrack = this.getNextTrack();
        console.log("next track", nextTrack);
        if (nextTrack) {
          this.store.dispatch(AudioActions.playTrack({ track: nextTrack }));
        }
      }

      this.audioState = audioState;
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    console.warn("player was destroyed");
    this.destroy$.next();
    this.destroy$.complete();
  }

  findTrackById(id: number): Track {
    return this.audioState.currTrackList.find((track) => track.id === id.toString());
  }

  getNextTrack(): Track {
    const nextTrackId = parseInt(this.audioState.trackId, 10) + 1;
    const nextTrack = this.findTrackById(nextTrackId);
    return nextTrack;
  }

  getPreviousTrack(): Track {
    const prevTrackId = parseInt(this.audioState.trackId, 10) - 1;
    const prevTrack = this.findTrackById(prevTrackId);
    return prevTrack;
  }

  onPause(): void {
    console.log("on pause");
    this.audioService.pausePlaying(this.audioState.bufferSource);
    // this.store.dispatch(AudioActions.pausePlaying({ bufferSource: this.audioState.bufferSource }));
  }

  onResume(): void {
    console.log("on resume");

    if (this.audioState.trackId) {
      this.store.dispatch(AudioActions.resumePlaying({
        currentTime: this.audioState.currentTime,
        audioBuffer: this.audioState.audioBuffer,
      }));
    } else {
      const track = this.audioState.currTrackList[0];
      this.store.dispatch(AudioActions.playTrack({ track }));
    }

  }

  isLastTrack(trackId: string): boolean {
    if (this.audioState.currTrackList.length > 0) {
      const trackListLength: number = this.audioState?.currTrackList.length;
      const nextTrack: Track = this.audioState?.currTrackList[trackListLength - 1];
      const nextTrackId: string = nextTrack.id;
      return trackId === nextTrackId;
    }
    return true;
  }

  onPrevious(): void {
    console.log("on previous");

    this.audioService.pausePlaying(this.audioState.bufferSource);
    this.audioService.resetTrackData();

    const prevTrack = this.getPreviousTrack();

    this.store.dispatch(AudioActions.playTrack({ track: prevTrack }));
  }

  onNext(): void {
    console.log("on next");

    this.audioService.pausePlaying(this.audioState.bufferSource);
    this.audioService.resetTrackData();

    const nextTrack = this.getNextTrack();

    this.store.dispatch(AudioActions.playTrack({ track: nextTrack }));
  }

}
