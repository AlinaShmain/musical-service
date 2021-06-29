import { createSelector } from "@ngrx/store";
import { AudioState, initialAudioState } from "./audio.state";
import { AuthState, initialAuthState } from "./auth.state";
import { FavouritesPageState, initialFavouritesPageState } from "./favourites-page.state";
import { HomePageState, initialHomePageState } from "./home-page.state";
import { initialMainPageState, MainPageState } from "./main-page.state";

export interface AppState {
    auth: AuthState;
    audio: AudioState;
    home: HomePageState;
    main: MainPageState;
    favourites: FavouritesPageState;
}

export const initialAppState: AppState = {
    auth: initialAuthState,
    audio: initialAudioState,
    home: initialHomePageState,
    main: initialMainPageState,
    favourites: initialFavouritesPageState,
};

export const selectAuthState = (state: AppState): AuthState => state.auth;

export const selectAuthenticated = createSelector(selectAuthState, (authState: AuthState) => authState.authenticated);
export const selectToken = createSelector(selectAuthState, (authState: AuthState) => authState.token);
export const selectLoginError = createSelector(selectAuthState, (authState: AuthState) => authState.loginError);
export const selectRegisterError = createSelector(selectAuthState, (authState: AuthState) => authState.registerError);

export const selectAudioState = (state: AppState): AudioState => state.audio;

export const selectIsPlaying = createSelector(selectAudioState, (audioState: AudioState) => audioState.isPlaying);
export const selectCurrentTime = createSelector(selectAudioState, (audioState: AudioState) => audioState.currentTime);
export const selectDuration = createSelector(selectAudioState, (audioState: AudioState) => audioState.duration);
export const selectError = createSelector(selectAudioState, (audioState: AudioState) => audioState.error);
export const selectIsEnded = createSelector(selectAudioState, (audioState: AudioState) => audioState.isEnded);
export const selectVolume = createSelector(selectAudioState, (audioState: AudioState) => audioState.volume);

export const selectHomePageState = (state: AppState): HomePageState => state.home;

export const selectTrackList = createSelector(selectHomePageState, (homeState: HomePageState) => homeState.tracks);

export const selectMainPageState = (state: AppState): MainPageState => state.main;

export const selectReturnUrl = createSelector(selectMainPageState, (mainState: MainPageState) => mainState.returnUrl);
export const selectIsOpenAuthModal = createSelector(selectMainPageState, (mainState: MainPageState) => mainState.isOpenAuthModal);
export const selectIsCloseAuthModal = createSelector(selectMainPageState, (mainState: MainPageState) => mainState.isCloseAuthModal);

export const selectFavouritesPageState = (state: AppState): FavouritesPageState => state.favourites;

export const selectFavourites = createSelector(selectFavouritesPageState, (favouritesState: FavouritesPageState) => favouritesState.tracks);





