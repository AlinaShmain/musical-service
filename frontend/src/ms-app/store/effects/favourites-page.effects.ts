import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, mergeMap, switchMap } from "rxjs/operators";
import { Track } from "src/ms-app/models/track";
import { TrackListService } from "src/ms-app/services/track-list/track-list.service";
import { AudioActions, FavouritesApiActions, FavouritesPageActions } from "../actions";

@Injectable({
    providedIn: "root"
})
export class FavouritesPageEffects {

    constructor(private actions$: Actions, private tracksService: TrackListService) { }

    getFavourites$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FavouritesPageActions.loadFavourites),
            mergeMap(({ token }) =>
                this.tracksService.getFavourites(token).pipe(
                    switchMap((tracks: Track[]) => [
                        FavouritesApiActions.gotFavouritesSuccess({
                            tracks
                        }),
                        AudioActions.loadTrackList({
                            currTrackList: [...tracks]
                        }),
                    ]),
                    catchError((error: Error) => {
                        // this.usersService?.clearLocStore();
                        return of(FavouritesApiActions.gotFavouritesError({ error }));
                    }),
                ),
            ),
        ),
    );

}
