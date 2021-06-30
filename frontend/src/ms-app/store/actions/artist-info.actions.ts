import { createAction, props } from "@ngrx/store";

export enum ArtistInfoActionTypes {
    LOAD_ARTIST_INFO = "[ArtistInfoPage] Load ArtistInfo",
    LOAD_TRACKS = "[ArtistInfoPage] Load Tracks",
}

export const loadArtistInfo = createAction(
    ArtistInfoActionTypes.LOAD_ARTIST_INFO,
    props<{ id: string }>(),
);

export const loadTracks = createAction(
    ArtistInfoActionTypes.LOAD_TRACKS,
    props<{ trackIds: string[] }>(),
);
