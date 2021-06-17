import { createAction, props } from "@ngrx/store";
import { Track } from "src/ms-app/models/track";

export enum AudioActionTypes {
    PLAY_TRACK = "[Audio] Play Track",
    UPDATE_CURRENT_TIME = "[Audio] Update CurrentTime",
    END_PLAYING = "[Audio] Stop Playing",
    PAUSE_PLAYING = "[Audio] Pause Playing",
    RESUME_PLAYING = "[Audio] Resume Playing",
}

export const playTrack = createAction(
    AudioActionTypes.PLAY_TRACK,
    props<{ track: Track }>(),
);

export const updateCurrentTime = createAction(
    AudioActionTypes.UPDATE_CURRENT_TIME,
    props<{ currentTime: string }>(),
);

export const endPlaying = createAction(
    AudioActionTypes.END_PLAYING,
);

export const pausePlaying = createAction(
    AudioActionTypes.PAUSE_PLAYING,
);

export const resumePlaying = createAction(
    AudioActionTypes.RESUME_PLAYING,
    props<{ currentTime: string, audioBuffer: AudioBuffer }>(),
);
