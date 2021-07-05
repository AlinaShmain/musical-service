import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { Playlist } from "src/ms-app/models/playlist";
import { PlaylistsService } from "src/ms-app/services/playlists/playlists.service";
import { PlaylistsApiActions, PlaylistsPageActions } from "../actions";

@Injectable({
    providedIn: "root"
})
export class PlaylistsPageEffects {

    constructor(private actions$: Actions, private playlistsService: PlaylistsService) { }

    getPlaylists$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PlaylistsPageActions.loadPlaylists),
            mergeMap(() =>
                this.playlistsService.getPlaylists().pipe(
                    map((playlists: Playlist[]) =>
                        PlaylistsApiActions.gotPlaylistsSuccess({
                            playlists
                        }),
                    ),
                    catchError((error: Error) => {
                        return of(PlaylistsApiActions.gotPlaylistsError({ error }));
                    }),
                ),
            ),
        ),
    );

    getUserPlaylists$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PlaylistsPageActions.loadUserPlaylists),
            mergeMap(({ token }) =>
                this.playlistsService.getUserPlaylists(token).pipe(
                    map((userPlaylists: Playlist[]) =>
                        PlaylistsApiActions.gotUserPlaylistsSuccess({
                            userPlaylists
                        }),
                        catchError((error: Error) => {
                            return of(PlaylistsApiActions.gotUserPlaylistsError({ error }));
                        }),
                    ),
                ),
            ),
        ),
    );

}
