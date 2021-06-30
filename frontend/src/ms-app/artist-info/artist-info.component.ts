import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subject, Subscription } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Artist } from "../models/artist";
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

  constructor(private route: ActivatedRoute, private store: Store<AppState>, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log("init artist info component");

    this.sub = this.route.params.pipe(
      takeUntil(this.destroy$),
    ).subscribe((params) => {
      const id = params["id"];
      console.log("id", id);

      this.store.dispatch(ArtistInfoActions.loadArtistInfo({ id }));
    });

    this.store.select(selectArtist).pipe(
      takeUntil(this.destroy$),
    ).subscribe((artist) => {
      console.log("update artist");
      this.artist = artist;
      console.log("got artist info", artist);

      artist && this.store.dispatch(ArtistInfoActions.loadTracks({ trackIds: artist.trackIds }));

      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    console.log("artists page on destroy");
    this.sub.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }

}
