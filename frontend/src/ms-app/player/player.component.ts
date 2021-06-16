import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
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

  constructor(private store: Store<AppState>, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log("player component init");

    this.store.select(selectAudioState).pipe(
      takeUntil(this.destroy$),
    ).subscribe((audioState) => {
      console.log(audioState);
      this.audioState = audioState;
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    console.warn("player was destroyed");
    this.destroy$.next();
    this.destroy$.complete();
  }

}
