import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subject, Subscription } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Artist } from "../models/artist";
import { MediaData } from "../models/media-data";
import { ArtistInfoActions } from "../store/actions";
import { AppState, selectArtist } from "../store/state/app.state";

@Component({
  selector: "ms-artist-info",
  templateUrl: "./artist-info.component.html",
  styleUrls: ["./artist-info.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistInfoComponent implements OnInit, OnDestroy {

  private sub: Subscription;
  private destroy$ = new Subject<void>();

  artist: Artist;
  mediaData: MediaData;

  constructor(private route: ActivatedRoute, private store: Store<AppState>, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.sub = this.route.params.pipe(
      takeUntil(this.destroy$),
    ).subscribe((params) => {
      const id = params["id"];

      this.store.dispatch(ArtistInfoActions.loadArtistInfo({ id }));
    });

    this.store.select(selectArtist).pipe(
      takeUntil(this.destroy$),
    ).subscribe((artist) => {
      this.artist = artist;

      if (artist) {
        this.mediaData = {
          imgPath: artist.path,
          header: artist.name,
          subtitle: artist.genre,
          description: artist.description,
          subheader: "Popular Tracks",
        };

        this.store.dispatch(ArtistInfoActions.loadTracks({ trackIds: artist.trackIds }));
      }

      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }

}
