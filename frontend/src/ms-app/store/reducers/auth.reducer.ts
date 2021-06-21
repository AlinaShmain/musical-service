import { createReducer, on } from "@ngrx/store";
import {
    AuthActions,
    AuthApiActions,
} from "../actions";
import { AuthState, initialAuthState } from "../state/auth.state";

export const authReducer = createReducer(initialAuthState,
    on(AuthActions.loginUser, (state, { user }): AuthState => ({
        ...state,
        user,
    })),
    on(AuthActions.registerUser, (state, { user }): AuthState => ({
        ...state,
        user,
    })),
    on(AuthApiActions.loggedSuccess, (state, { token }): AuthState => ({
        ...state,
        authenticated: true,
        token,
    })),
    on(AuthApiActions.loggedError, (state, { loginError }): AuthState => ({
        ...state,
        loginError,
        user: null,
    })),
    on(AuthApiActions.registeredSuccess, (state, { token }): AuthState => ({
        ...state,
        authenticated: true,
        token,
    })),
    on(AuthApiActions.registeredError, (state, { registerError }): AuthState => ({
        ...state,
        registerError,
        user: null,
    })),
    // on(AuthActions.setIsOpenAuthModal, (state, { isOpenAuthModal }): AuthState => ({
    //     ...state,
    //     isOpenAuthModal,
    // })),
);
