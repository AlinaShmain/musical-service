import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { AudioService } from "src/ms-app/services/track/audio.service";
import { TrackService } from "src/ms-app/services/track/track.service";
import { AudioActions, AudioApiActions } from "../actions";

@Injectable({
    providedIn: "root"
})
export class AudioEffects {

    constructor(private actions$: Actions, private trackService: TrackService, private audioService: AudioService) { }

    playTrack$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AudioActions.playTrack),
            mergeMap(({ track }) =>
                this.trackService.getTrack(track.id).pipe(
                    map(({ audioBuffer, bufferSource }) => {
                        const startedAt = this.audioService.playTrack(bufferSource);
                        const startNum = parseInt(startedAt, 10);
                        const inSec = (Date.now() - startNum) / 1000;
                        this.audioService.updateCurrentTime(inSec, bufferSource.buffer.duration);
                        return AudioApiActions.gotTrackSuccess({
                            audioBuffer,
                            bufferSource,
                        });
                    }),
                    catchError((error: Error) => of(AudioApiActions.gotTrackError({ error }))),
                )),
        ),
    );

    resumePlaying$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AudioActions.resumePlaying),
            map(({ currentTime, audioBuffer }) => {
                const bufferSource = this.audioService.createBufferSource(audioBuffer);
                this.audioService.playTrack(bufferSource, parseInt(currentTime, 10));
                const startNum = parseInt(currentTime, 10);
                this.audioService.updateCurrentTime(startNum, bufferSource.buffer.duration);

                return AudioApiActions.playSuccess({ bufferSource });
            }),
        ),
        // { dispatch: false },
    );
}
