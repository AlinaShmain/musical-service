import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Track } from "../models/track";
import { TrackHeaders } from "../models/track-headers";
import { TrackListService } from "../services/track-list/track-list.service";

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
  tracks$: Observable<Track[]> = this.trackListService.getTracks();

  isOpenDropdown: boolean[] = [];

  private destroy$ = new Subject<void>();

  constructor(private trackListService: TrackListService) { }

  ngOnInit(): void {
    console.log("init track list component");
    this.trackListService.getTracks().pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        console.log("after get response", response);
        // this.tracks$ = response;
      },
      error: (error) => {
        console.error(error);
      }
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

}
