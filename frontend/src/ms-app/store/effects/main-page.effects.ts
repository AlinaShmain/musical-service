import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap } from "rxjs/operators";
import { of } from "rxjs";
import { TrackService } from "src/ms-app/services/track/track.service";
import { MainApiActions, MainPageActions } from "../actions";

@Injectable({
    providedIn: "root"
})
export class MainPageEffects {

    constructor(private actions$: Actions, private trackService: TrackService) { }

    likeTrack$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MainPageActions.likeTrack),
            mergeMap(({ trackId, userEmail }) =>
                this.trackService.addToFavourites(trackId, userEmail).pipe(
                    map(({ favouriteList }) =>
                        MainApiActions.addedToFavouritesSuccess({
                            favouriteList
                        }),
                    ),
                    catchError((error: Error) => of(MainApiActions.addedToFavouritesError({ addedToFavouritesError: error }))),
                )),
        ),
    );

}
