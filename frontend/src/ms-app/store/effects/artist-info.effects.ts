import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import { Artist } from "src/ms-app/models/artist";
import { Track } from "src/ms-app/models/track";
import { ArtistListService } from "src/ms-app/services/artist-list/artist-list.service";
import { ArtistInfoActions, ArtistInfoApiActions, AudioActions } from "../actions";

@Injectable({
    providedIn: "root"
})
export class ArtistInfoEffects {

    constructor(private actions$: Actions, private artistsService: ArtistListService) { }

    getArtistInfo$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ArtistInfoActions.loadArtistInfo),
            mergeMap(({ id }) =>
                this.artistsService.getArtistInfo(id).pipe(
                    map((artist: Artist) =>
                        ArtistInfoApiActions.gotArtistInfoSuccess({
                            artist
                        }),
                    ),
                    catchError((error: Error) => {
                        return of(ArtistInfoApiActions.gotArtistInfoError({ error }));
                    }),
                ),
            ),
        ),
    );

    getArtistTracks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ArtistInfoActions.loadTracks),
            mergeMap(({ trackIds }) =>
                this.artistsService.getArtistTracks(trackIds).pipe(
                    switchMap((tracks: Track[]) => [
                        ArtistInfoApiActions.gotTracksSuccess({
                            tracks
                        }),
                        AudioActions.loadTrackList({
                            currTrackList: [...tracks]
                        }),
                    ]),
                    catchError((error: Error) => {
                        return of(ArtistInfoApiActions.gotTracksError({ error }));
                    }),
                ),
            ),
        ),
    );

}
