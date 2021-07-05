import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { Artist } from "src/ms-app/models/artist";
import { ArtistListService } from "src/ms-app/services/artist-list/artist-list.service";
import { ArtistsApiActions, ArtistsPageActions } from "../actions";

@Injectable({
    providedIn: "root"
})
export class ArtistsPageEffects {

    constructor(private actions$: Actions, private artistsService: ArtistListService) { }

    getArtists$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ArtistsPageActions.loadArtists),
            mergeMap(() =>
                this.artistsService.getArtists().pipe(
                    map((artists: Artist[]) =>
                        ArtistsApiActions.gotArtistsSuccess({
                            artists
                        }),
                    ),
                    catchError((error: Error) => {
                        return of(ArtistsApiActions.gotArtistsError({ error }));
                    }),
                ),
            ),
        ),
    );

}
