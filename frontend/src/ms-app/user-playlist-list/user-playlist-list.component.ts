import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Card } from "../models/card";
import { Playlist } from "../models/playlist";
import { UsersService } from "../services/users/users.service";
import { PlaylistsPageActions } from "../store/actions";
import { AppState, selectUserPlaylists } from "../store/state/app.state";

@Component({
  selector: "ms-user-playlist-list",
  templateUrl: "./user-playlist-list.component.html",
  styleUrls: ["./user-playlist-list.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPlaylistListComponent implements OnInit {

  private destroy$ = new Subject<void>();

  playlists: Playlist[] = [];
  cards: Card[];

  constructor(private store: Store<AppState>, private cdr: ChangeDetectorRef, private usersService: UsersService) { }

  ngOnInit(): void {
    const token = this.usersService.getFromLocStore("jwt-token");
    token && this.store.dispatch(PlaylistsPageActions.loadUserPlaylists({ token }));

    this.store.select(selectUserPlaylists).pipe(
      takeUntil(this.destroy$),
    ).subscribe((playlists) => {
      console.log("update user playlists");
      this.playlists = playlists;
      console.log(playlists);

      if (this.playlists.length > 0) {
        this.cards = [];
        for (const playlist of this.playlists) {
          this.cards.push({
            link: `/main/playlist/${playlist.id}`,
            title: playlist.title,
            imagesPath: [...playlist.imagesPath],
          });
        }
        console.log(this.cards);
      }

      this.cdr.markForCheck();
    });
  }

}
