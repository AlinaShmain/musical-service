import { createAction, props } from "@ngrx/store";
import { Playlist } from "src/ms-app/models/playlist";

export enum PlaylistsApiActionTypes {
    GET_PLAYLISTS_SUCCESS = "[PlaylistsPage/API] GetPlaylists Success",
    GET_PLAYLISTS_ERROR = "[PlaylistsPage/API] GetPlaylists Error",
    GET_USER_PLAYLISTS_SUCCESS = "[PlaylistsPage/API] GetUserPlaylists Success",
    GET_USER_PLAYLISTS_ERROR = "[PlaylistsPage/API] GetUserPlaylists Error",
}

export const gotPlaylistsSuccess = createAction(
    PlaylistsApiActionTypes.GET_PLAYLISTS_SUCCESS,
    props<{ playlists: Playlist[] }>(),
);

export const gotPlaylistsError = createAction(
    PlaylistsApiActionTypes.GET_PLAYLISTS_ERROR,
    props<{ error: Error }>(),
);

export const gotUserPlaylistsSuccess = createAction(
    PlaylistsApiActionTypes.GET_USER_PLAYLISTS_SUCCESS,
    props<{ userPlaylists: Playlist[] }>(),
);

export const gotUserPlaylistsError = createAction(
    PlaylistsApiActionTypes.GET_USER_PLAYLISTS_ERROR,
    props<{ error: Error }>(),
);
