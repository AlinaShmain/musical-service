import { createSelector } from "@ngrx/store";
import { AuthState, initialAuthState } from "./auth.state";

export interface AppState {
    auth: AuthState;
}

export const initialAppState: AppState = {
    auth: initialAuthState,
};

export const selectAuthState = (state: AppState): AuthState => state.auth;

export const selectAuthenticated = createSelector(selectAuthState, (authState: AuthState) => authState.authenticated);
export const selectToken = createSelector(selectAuthState, (authState: AuthState) => authState.token);
export const selectIsOpenAuthModal = createSelector(selectAuthState, (authState: AuthState) => authState.isOpenAuthModal);
export const selectLoginError = createSelector(selectAuthState, (authState: AuthState) => authState.loginError);
export const selectRegisterError = createSelector(selectAuthState, (authState: AuthState) => authState.registerError);

