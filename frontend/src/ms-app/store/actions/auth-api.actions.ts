import { createAction, props } from "@ngrx/store";

export enum AuthApiActionTypes {
    LOGIN_SUCCESS = "[Auth/API] Login Success",
    LOGIN_ERROR = "[Auth/API] Login Error",
    REGISTER_SUCCESS = "[Auth/API] Register Success",
    REGISTER_ERROR = "[Auth/API] Register Error",
}

export const loggedSuccess = createAction(
    AuthApiActionTypes.LOGIN_SUCCESS,
    props<{ token: string }>(),
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
