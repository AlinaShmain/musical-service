import { createAction, props } from "@ngrx/store";
import { Track } from "src/ms-app/models/track";

export enum HomeApiActionTypes {
    GET_TRACKS_SUCCESS = "[HomePage/API] GetTracks Success",
    GET_TRACKS_ERROR = "[HomePage/API] GetTracks Error",
}

export const gotTracksSuccess = createAction(
    HomeApiActionTypes.GET_TRACKS_SUCCESS,
    props<{ tracks: Track[] }>(),
);

export const gotTracksError = createAction(
    HomeApiActionTypes.GET_TRACKS_ERROR,
    props<{ error: Error }>(),
);

