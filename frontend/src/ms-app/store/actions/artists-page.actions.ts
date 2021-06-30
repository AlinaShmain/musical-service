import { createAction } from "@ngrx/store";

export enum ArtistsActionTypes {
    LOAD_ARTISTS = "[ArtistsPage] Load Artists",
}

export const loadArtists = createAction(
    ArtistsActionTypes.LOAD_ARTISTS,
);
