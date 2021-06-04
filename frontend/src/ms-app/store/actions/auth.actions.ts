import { createAction, props } from "@ngrx/store";
import { User } from "src/ms-app/models/user";

export enum AuthActionTypes {
    LOGIN_USER = "[Auth] Login User",
    REGISTER_USER = "[Auth] Register User",
    SET_IS_OPEN_AUTH_MODAL = "[Auth] Set IsOpenAuthModal",
}

export const loginUser = createAction(
    AuthActionTypes.LOGIN_USER,
    props<{ user: User }>(),
);

export const registerUser = createAction(
    AuthActionTypes.REGISTER_USER,
    props<{ user: User }>(),
);

export const setIsOpenAuthModal = createAction(
    AuthActionTypes.SET_IS_OPEN_AUTH_MODAL,
    props<{ isOpenAuthModal: boolean }>(),
);
