import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Artist } from "../models/artist";
import { Card } from "../models/card";
import { ArtistsPageActions } from "../store/actions";
import { AppState, selectArtists } from "../store/state/app.state";

@Component({
  selector: "ms-artist-list",
  templateUrl: "./artist-list.component.html",
  styleUrls: ["./artist-list.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistListComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  artists: Artist[] = [];
  cards: Card[];

  constructor(private store: Store<AppState>, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log("artists component init");

    this.store.dispatch(ArtistsPageActions.loadArtists());

    this.store.select(selectArtists).pipe(
      takeUntil(this.destroy$),
    ).subscribe((artists) => {
      console.log("update artists");
      this.artists = artists;
      console.log(artists);

      if (this.artists.length > 0) {
        this.cards = [];
        for (const artist of this.artists) {
          this.cards.push({
            link: `/main/artist/${artist.id}`,
            imgPath: artist.path,
            title: artist.name,
          });
        }
        console.log(this.cards);
      }

      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    console.log("artists page on destroy");
    this.destroy$.next();
    this.destroy$.complete();
  }

}
