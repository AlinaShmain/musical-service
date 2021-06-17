import { createAction, props } from "@ngrx/store";

export enum AudioApiActionTypes {
    GET_TRACK_SUCCESS = "[Audio/API] GetTrack Success",
    GET_TRACK_ERROR = "[Audio/API] GetTrack Error",
    PLAY_SUCCESS = "[Audio/API] Play Success",
}

export const gotTrackSuccess = createAction(
    AudioApiActionTypes.GET_TRACK_SUCCESS,
    props<{ audioBuffer: AudioBuffer, bufferSource: AudioBufferSourceNode }>(),
);

export const gotTrackError = createAction(
    AudioApiActionTypes.GET_TRACK_ERROR,
    props<{ error: Error }>(),
);

export const playSuccess = createAction(
    AudioApiActionTypes.PLAY_SUCCESS,
    props<{ bufferSource: AudioBufferSourceNode }>(),
);

