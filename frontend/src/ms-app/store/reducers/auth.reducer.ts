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
    on(AuthApiActions.loggedSuccess, (state, { token, userInfo }): AuthState => ({
        ...state,
        authenticated: true,
        token,
        user: userInfo,
    })),
    on(AuthApiActions.loggedError, (state, { loginError }): AuthState => ({
        ...state,
        loginError,
        authenticated: false,
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
        authenticated: false,
        user: null,
    })),
    on(AuthActions.logoutUser, (state): AuthState => ({
        ...state,
        authenticated: false,
        user: null,
        token: "",
    })),
    // on(AuthActions.verifyUser, (state): AuthState => ({
    //     ...state,
    // })),
    // on(AuthApiActions.verifiedSuccess, (state, { token }): AuthState => ({
    //     ...state,
    //     authenticated: true,
    //     token,
    // })),
    // on(AuthApiActions.verifiedError, (state, { verifyError }): AuthState => ({
    //     ...state,
    //     verifyError,
    //     user: null,
    // })),
    on(AuthActions.getUserInfo, (state): AuthState => ({
        ...state,
    })),
    on(AuthApiActions.gotUserSuccess, (state, { user }): AuthState => ({
        ...state,
        user,
        authenticated: true,
    })),
    on(AuthApiActions.gotUserError, (state, { verifyError }): AuthState => ({
        ...state,
        verifyError,
        authenticated: false,
        user: null,
    })),
);
