import { createAction, props } from "@ngrx/store";
import { Artist } from "src/ms-app/models/artist";

export enum ArtistsApiActionTypes {
    GET_ARTISTS_SUCCESS = "[ArtistsPage/API] GetArtists Success",
    GET_ARTISTS_ERROR = "[ArtistsPage/API] GetArtists Error",
}

export const gotArtistsSuccess = createAction(
    ArtistsApiActionTypes.GET_ARTISTS_SUCCESS,
    props<{ artists: Artist[] }>(),
);

export const gotArtistsError = createAction(
    ArtistsApiActionTypes.GET_ARTISTS_ERROR,
    props<{ error: Error }>(),
);

