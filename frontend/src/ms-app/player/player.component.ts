import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
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
      // console.log(audioState);
      this.audioState = audioState;
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    console.warn("player was destroyed");
    this.destroy$.next();
    this.destroy$.complete();
  }

  onPause(): void {
    console.log("on pause");
    this.audioService.pausePlaying(this.audioState.bufferSource);
    // this.store.dispatch(AudioActions.pausePlaying({ bufferSource: this.audioState.bufferSource }));
  }

  onResume(): void {
    console.log("on resume");
    this.store.dispatch(AudioActions.resumePlaying({
      currentTime: this.audioState.currentTime,
      audioBuffer: this.audioState.audioBuffer,
    }));
  }

}
