import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, mergeMap, switchMap } from "rxjs/operators";
import { Track } from "src/ms-app/models/track";
import { TrackListService } from "src/ms-app/services/track-list/track-list.service";
import { AudioActions, HomeApiActions, HomePageActions } from "../actions";

@Injectable({
    providedIn: "root"
})
export class HomePageEffects {

    constructor(private actions$: Actions, private tracksService: TrackListService) { }

    getTracks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(HomePageActions.getTracks),
            mergeMap(() =>
                this.tracksService.getTracks().pipe(
                    switchMap((tracks: Track[]) => [
                        HomeApiActions.gotTracksSuccess({
                            tracks
                        }),
                        AudioActions.loadTrackList({
                            currTrackList: [...tracks]
                        }),
                    ]),
                    catchError((error: Error) => of(HomeApiActions.gotTracksError({ error }))),
                )),
        ),
    );

}
