import { createAction, props } from "@ngrx/store";
import { Track } from "src/ms-app/models/track";

export enum AudioActionTypes {
    PLAY_TRACK = "[Audio] Play Track",
}

export const playTrack = createAction(
    AudioActionTypes.PLAY_TRACK,
    props<{ track: Track }>(),
);
