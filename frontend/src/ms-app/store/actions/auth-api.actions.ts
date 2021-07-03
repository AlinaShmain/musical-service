import { createAction, props } from "@ngrx/store";
import { Playlist } from "src/ms-app/models/playlist";
import { User } from "src/ms-app/models/user";

export enum AuthApiActionTypes {
    LOGIN_SUCCESS = "[Auth/API] Login Success",
    LOGIN_ERROR = "[Auth/API] Login Error",
    REGISTER_SUCCESS = "[Auth/API] Register Success",
    REGISTER_ERROR = "[Auth/API] Register Error",
    GOT_USER_SUCCESS = "[Auth/API] GotUser Success",
    GOT_USER_ERROR = "[Auth/API] GotUser Error",
    ADD_TO_FAVOURITES_SUCCESS = "[Auth/API] Add To Favourites Success",
    ADD_TO_FAVOURITES_ERROR = "[Auth/API] Add To Favourites Error",
    DELETE_FROM_FAVOURITES_SUCCESS = "[Auth/API] Delete From Favourites Success",
    DELETE_FROM_FAVOURITES_ERROR = "[Auth/API] Delete From Favourites Error",
    CREATE_PLAYLIST_SUCCESS = "[Auth/API] CreatePlaylist Success",
    CREATE_PLAYLIST_ERROR = "[Auth/API] CreatePlaylist Error",
    EDIT_PLAYLIST_SUCCESS = "[Auth/API] EditPlaylist Success",
    EDIT_PLAYLIST_ERROR = "[Auth/API] EditPlaylist Error",
}

export const loggedSuccess = createAction(
    AuthApiActionTypes.LOGIN_SUCCESS,
    props<{ token: string, userInfo: User }>(),
);

export const loggedError = createAction(
    AuthApiActionTypes.LOGIN_ERROR,
    props<{ loginError: Error }>(),
);

export const registeredSuccess = createAction(
    AuthApiActionTypes.REGISTER_SUCCESS,
    props<{ token: string }>(),
);

export const registeredError = createAction(
    AuthApiActionTypes.REGISTER_ERROR,
    props<{ registerError: Error }>(),
);

export const gotUserSuccess = createAction(
    AuthApiActionTypes.GOT_USER_SUCCESS,
    props<{ user: User }>(),
);

export const gotUserError = createAction(
    AuthApiActionTypes.GOT_USER_ERROR,
    props<{ verifyError: Error }>(),
);

export const addedToFavouritesSuccess = createAction(
    AuthApiActionTypes.ADD_TO_FAVOURITES_SUCCESS,
    props<{ favouriteTracks: string[] }>(),
);

export const addedToFavouritesError = createAction(
    AuthApiActionTypes.ADD_TO_FAVOURITES_ERROR,
    props<{ addedToFavouritesError: Error }>(),
);

export const deletedFromFavouritesSuccess = createAction(
    AuthApiActionTypes.DELETE_FROM_FAVOURITES_SUCCESS,
    props<{ favouriteTracks: string[] }>(),
);

export const deletedFromFavouritesError = createAction(
    AuthApiActionTypes.DELETE_FROM_FAVOURITES_ERROR,
    props<{ deletedFromFavouritesError: Error, trackId: string }>(),
);

export const createdPlaylistSuccess = createAction(
    AuthApiActionTypes.CREATE_PLAYLIST_SUCCESS,
    props<{ playlistIds: string[] }>(),
);

export const createdPlaylistError = createAction(
    AuthApiActionTypes.CREATE_PLAYLIST_ERROR,
    props<{ createdPlaylistError: Error, playlist: Playlist }>(),
);

export const editedPlaylistSuccess = createAction(
    AuthApiActionTypes.EDIT_PLAYLIST_SUCCESS,
    props<{ playlist: Playlist }>(),
);

export const editedPlaylistError = createAction(
    AuthApiActionTypes.EDIT_PLAYLIST_ERROR,
    props<{ editedPlaylistError: Error }>(),
);
