import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import { Playlist } from "src/ms-app/models/playlist";
import { Track } from "src/ms-app/models/track";
import { PlaylistsService } from "src/ms-app/services/playlists/playlists.service";
import { AudioActions, PlaylistInfoActions, PlaylistInfoApiActions } from "../actions";

@Injectable({
    providedIn: "root"
})
export class PlaylistInfoEffects {

    constructor(private actions$: Actions, private playlistsService: PlaylistsService) { }

    getPlaylistInfo$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PlaylistInfoActions.loadPlaylistInfo),
            mergeMap(({ id }) =>
                this.playlistsService.getPlaylistInfo(id).pipe(
                    map((playlist: Playlist) =>
                        PlaylistInfoApiActions.gotPlaylistInfoSuccess({
                            playlist
                        }),
                    ),
                    catchError((error: Error) => {
                        return of(PlaylistInfoApiActions.gotPlaylistInfoError({ error }));
                    }),
                ),
            ),
        ),
    );

    getPlaylistTracks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PlaylistInfoActions.loadTracks),
            mergeMap(({ trackIds }) =>
                this.playlistsService.getPlaylistTracks(trackIds).pipe(
                    switchMap((tracks: Track[]) => [
                        PlaylistInfoApiActions.gotTracksSuccess({
                            tracks
                        }),
                        AudioActions.loadTrackList({
                            currTrackList: [...tracks]
                        }),
                    ]),
                    catchError((error: Error) => {
                        return of(PlaylistInfoApiActions.gotTracksError({ error }));
                    }),
                ),
            ),
        ),
    );

}
