import { createSelector } from "@ngrx/store";
import { AudioState, initialAudioState } from "./audio.state";
import { AuthState, initialAuthState } from "./auth.state";
import { HomePageState, initialHomePageState } from "./home-page.state";

export interface AppState {
    auth: AuthState;
    audio: AudioState;
    home: HomePageState;
}

export const initialAppState: AppState = {
    auth: initialAuthState,
    audio: initialAudioState,
    home: initialHomePageState,
};

export const selectAuthState = (state: AppState): AuthState => state.auth;

export const selectAuthenticated = createSelector(selectAuthState, (authState: AuthState) => authState.authenticated);
export const selectToken = createSelector(selectAuthState, (authState: AuthState) => authState.token);
export const selectIsOpenAuthModal = createSelector(selectAuthState, (authState: AuthState) => authState.isOpenAuthModal);
export const selectLoginError = createSelector(selectAuthState, (authState: AuthState) => authState.loginError);
export const selectRegisterError = createSelector(selectAuthState, (authState: AuthState) => authState.registerError);

export const selectAudioState = (state: AppState): AudioState => state.audio;

export const selectIsPlaying = createSelector(selectAudioState, (audioState: AudioState) => audioState.isPlaying);
export const selectCurrentTime = createSelector(selectAudioState, (audioState: AudioState) => audioState.currentTime);
export const selectDuration = createSelector(selectAudioState, (audioState: AudioState) => audioState.duration);
export const selectError = createSelector(selectAudioState, (audioState: AudioState) => audioState.error);
// export const selectAudioBuffer = createSelector(selectAudioState, (audioState: AudioState) => audioState.audioBuffer);
export const selectIsEnded = createSelector(selectAudioState, (audioState: AudioState) => audioState.isEnded);

export const selectHomePageState = (state: AppState): HomePageState => state.home;

export const selectTrackList = createSelector(selectHomePageState, (homeState: HomePageState) => homeState.tracks);

