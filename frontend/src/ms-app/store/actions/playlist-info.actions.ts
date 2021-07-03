import { createAction, props } from "@ngrx/store";

export enum PlaylistInfoActionTypes {
    LOAD_PLAYLIST_INFO = "[PlaylistInfoPage] Load PlaylistInfo",
    LOAD_TRACKS = "[PlaylistInfoPage] Load Tracks",
}

export const loadPlaylistInfo = createAction(
    PlaylistInfoActionTypes.LOAD_PLAYLIST_INFO,
    props<{ id: string }>(),
);

export const loadTracks = createAction(
    PlaylistInfoActionTypes.LOAD_TRACKS,
    props<{ trackIds: string[] }>(),
);
