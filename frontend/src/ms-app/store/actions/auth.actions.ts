import { createAction, props } from "@ngrx/store";
import { User } from "src/ms-app/models/user";

export enum AuthActionTypes {
    LOGIN_USER = "[Auth] Login User",
    REGISTER_USER = "[Auth] Register User",
    // VERIFY_USER = "[Auth] Verify User",
    GET_USER_INFO = "[Auth] Get UserInfo",
    LOGOUT_USER = "[Auth] Logout User",
    LIKE_TRACK = "[Auth] Like Track",
    DISLIKE_TRACK = "[Auth] Dislike Track",
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

// export const verifyUser = createAction(
//     AuthActionTypes.VERIFY_USER,
//     props<{ user: User }>(),
// );

export const likeTrack = createAction(
    AuthActionTypes.LIKE_TRACK,
    props<{ trackId: string, token: string }>(),
);

export const dislikeTrack = createAction(
    AuthActionTypes.DISLIKE_TRACK,
    props<{ trackId: string, token: string }>(),
);
