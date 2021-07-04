import { createAction, props } from "@ngrx/store";
import { Playlist } from "src/ms-app/models/playlist";
import { User } from "src/ms-app/models/user";

export enum AuthActionTypes {
    LOGIN_USER = "[Auth] Login User",
    REGISTER_USER = "[Auth] Register User",
    GET_USER_INFO = "[Auth] Get UserInfo",
    LOGOUT_USER = "[Auth] Logout User",
    LIKE_TRACK = "[Auth] Like Track",
    DISLIKE_TRACK = "[Auth] Dislike Track",
    CREATE_PLAYLIST = "[Auth] Create Playlist",
    EDIT_PLAYLIST = "[Auth] Edit Playlist",
    DELETE_PLAYLIST = "[Auth] Delete Playlist",
    DELETE_FROM_PLAYLIST = "[Auth] Delete From Playlist",
    // ADD_TO_PLAYLIST = "[Auth] AddTo Playlist",
}

export const loginUser = createAction(
    AuthActionTypes.LOGIN_USER,
    props<{ user: User }>(),
);

export const registerUser = createAction(
    AuthActionTypes.REGISTER_USER,
    props<{ user: User }>(),
);

export const getUserInfo = createAction(
    AuthActionTypes.GET_USER_INFO,
    props<{ token: string }>(),
);

export const logoutUser = createAction(
    AuthActionTypes.LOGOUT_USER,
);

export const likeTrack = createAction(
    AuthActionTypes.LIKE_TRACK,
    props<{ trackId: string, token: string }>(),
);

export const dislikeTrack = createAction(
    AuthActionTypes.DISLIKE_TRACK,
    props<{ trackId: string, token: string }>(),
);

export const createPlaylist = createAction(
    AuthActionTypes.CREATE_PLAYLIST,
    props<{ playlistInfo: Playlist, token: string }>(),
);

export const editPlaylist = createAction(
    AuthActionTypes.EDIT_PLAYLIST,
    props<{ playlistInfo: Playlist, token: string }>(),
);

export const deletePlaylist = createAction(
    AuthActionTypes.DELETE_PLAYLIST,
    props<{ playlistId: string, token: string }>(),
);

export const deleteFromPlaylist = createAction(
    AuthActionTypes.DELETE_FROM_PLAYLIST,
    props<{ playlistId: string, trackId: string, token: string }>(),
);

// export const addToPlaylist = createAction(
//     AuthActionTypes.ADD_TO_PLAYLIST,
//     props<{ trackId: string, playlistId: string, token: string }>(),
// );
