import { createAction } from "@ngrx/store";

export enum HomeActionTypes {
    GET_TRACKS = "[HomePage] Get Tracks",
}

export const getTracks = createAction(
    HomeActionTypes.GET_TRACKS,
);

