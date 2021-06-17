import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Track } from "../models/track";
import { TrackHeaders } from "../models/track-headers";
import { AudioActions, HomePageActions } from "../store/actions";
import { AppState, selectTrackList } from "../store/state/app.state";

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

  isOpenDropdown: boolean[] = [];

  private destroy$ = new Subject<void>();

  constructor(private store: Store<AppState>,
    private cdr: ChangeDetectorRef) { }

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

  onPlay(track: Track): void {
    console.log("on play", track);
    this.store.dispatch(AudioActions.playTrack({ track }));
  }

}
