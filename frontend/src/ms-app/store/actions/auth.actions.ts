import { createAction, props } from "@ngrx/store";

export enum AuthApiActionTypes {
    LOGIN_SUCCESS = "[Auth/API] Login Success",
    LOGIN_ERROR = "[Auth/API] Login Error",
    REGISTER_SUCCESS = "[Auth/API] Register Success",
    REGISTER_ERROR = "[Auth/API] Register Error",
}

export const LOGGED_SUCCESS = createAction(
    AuthApiActionTypes.LOGIN_SUCCESS,
    props<{ token: string }>(),
);

export const LOGGED_ERROR = createAction(
    AuthApiActionTypes.LOGIN_ERROR,
    props<{ error: Error }>(),
);

export const REGISTERED_SUCCESS = createAction(
    AuthApiActionTypes.REGISTER_SUCCESS,
    props<{ token: string }>(),
);

export const REGISTERED_ERROR = createAction(
    AuthApiActionTypes.REGISTER_ERROR,
    props<{ error: Error }>(),
);
