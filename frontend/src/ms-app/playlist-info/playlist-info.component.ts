import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subject, Subscription } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { MediaData } from "../models/media-data";
import { Playlist } from "../models/playlist";
import { PlaylistInfoActions } from "../store/actions";
import { AppState, selectPlaylist } from "../store/state/app.state";

@Component({
  selector: "ms-playlist-info",
  templateUrl: "./playlist-info.component.html",
  styleUrls: ["./playlist-info.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistInfoComponent implements OnInit, OnDestroy {

  private sub: Subscription;
  private destroy$ = new Subject<void>();

  playlist: Playlist;
  mediaData: MediaData;

  constructor(private route: ActivatedRoute, private store: Store<AppState>, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log("init artist info component");

    this.sub = this.route.params.pipe(
      takeUntil(this.destroy$),
    ).subscribe((params) => {
      const id = params["id"];
      console.log("id", id);

      this.store.dispatch(PlaylistInfoActions.loadPlaylistInfo({ id }));
    });

    this.store.select(selectPlaylist).pipe(
      takeUntil(this.destroy$),
    ).subscribe((playlist) => {
      console.log("update playlist");
      this.playlist = playlist;

      if (playlist) {
        this.mediaData = {
          imagesPath: [...playlist.imagesPath],
          header: playlist.title,
          subtitle: `${playlist.totalLikes} likes, ${playlist.trackIds.length} songs`,
          description: playlist.description,
          // subheader: "Tracks",
        };
        console.log("got playlist info", playlist);

        this.store.dispatch(PlaylistInfoActions.loadTracks({ trackIds: playlist.trackIds }));
      }

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
