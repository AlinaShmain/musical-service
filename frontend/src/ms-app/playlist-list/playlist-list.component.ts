import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Card } from "../models/card";
import { Playlist } from "../models/playlist";
import { PlaylistsPageActions } from "../store/actions";
import { AppState, selectPlaylists } from "../store/state/app.state";

@Component({
  selector: "ms-playlist-list",
  templateUrl: "./playlist-list.component.html",
  styleUrls: ["./playlist-list.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistListComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  playlists: Playlist[] = [];
  cards: Card[];

  constructor(private store: Store<AppState>, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.store.dispatch(PlaylistsPageActions.loadPlaylists());

    this.store.select(selectPlaylists).pipe(
      takeUntil(this.destroy$),
    ).subscribe((playlists) => {
      this.playlists = playlists;

      if (this.playlists.length > 0) {
        this.cards = [];
        for (const playlist of this.playlists) {
          this.cards.push({
            link: `/main/playlist/${playlist.id}`,
            title: playlist.title,
            imagesPath: [...playlist.imagesPath],
          });
        }
      }

      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
