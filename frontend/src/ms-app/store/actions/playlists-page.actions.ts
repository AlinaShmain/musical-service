import { createAction, props } from "@ngrx/store";

export enum PlaylistsActionTypes {
    LOAD_PLAYLISTS = "[PlaylistsPage] Load Playlists",
    LOAD_USER_PLAYLISTS = "[PlaylistsPage] Load UserPlaylists",
}

export const loadPlaylists = createAction(
    PlaylistsActionTypes.LOAD_PLAYLISTS,
);

export const loadUserPlaylists = createAction(
    PlaylistsActionTypes.LOAD_USER_PLAYLISTS,
    props<{ token: string }>(),
);
