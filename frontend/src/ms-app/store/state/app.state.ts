import { createSelector } from "@ngrx/store";
import { ArtistInfoState, initialArtistInfoState } from "./artist-info.state";
import { ArtistsPageState, initialArtistsPageState } from "./artists-page.state";
import { AudioState, initialAudioState } from "./audio.state";
import { AuthState, initialAuthState } from "./auth.state";
import { FavouritesPageState, initialFavouritesPageState } from "./favourites-page.state";
import { HomePageState, initialHomePageState } from "./home-page.state";
import { initialMainPageState, MainPageState } from "./main-page.state";
import { initialPlaylistInfoState, PlaylistInfoState } from "./playlist-info.state";
import { initialPlaylistsPageState, PlaylistsPageState } from "./playlists.state";

export interface AppState {
    auth: AuthState;
    audio: AudioState;
    home: HomePageState;
    main: MainPageState;
    favourites: FavouritesPageState;
    artists: ArtistsPageState;
    artistInfo: ArtistInfoState;
    playlists: PlaylistsPageState;
    playlistInfo: PlaylistInfoState;
}

export const initialAppState: AppState = {
    auth: initialAuthState,
    audio: initialAudioState,
    home: initialHomePageState,
    main: initialMainPageState,
    favourites: initialFavouritesPageState,
    artists: initialArtistsPageState,
    artistInfo: initialArtistInfoState,
    playlists: initialPlaylistsPageState,
    playlistInfo: initialPlaylistInfoState,
};

export const selectAuthState = (state: AppState): AuthState => state.auth;

export const selectAuthenticated = createSelector(selectAuthState, (authState: AuthState) => authState.authenticated);
export const selectToken = createSelector(selectAuthState, (authState: AuthState) => authState.token);
export const selectLoginError = createSelector(selectAuthState, (authState: AuthState) => authState.loginError);
export const selectRegisterError = createSelector(selectAuthState, (authState: AuthState) => authState.registerError);
export const selectIsCreated = createSelector(selectAuthState, (authState: AuthState) => authState.isCreated);
export const selectIsEdited = createSelector(selectAuthState, (authState: AuthState) => authState.isEdited);
export const selectIsDeleted = createSelector(selectAuthState, (authState: AuthState) => authState.isDeleted);
export const selectIsDeletedFromPlaylist = createSelector(selectAuthState, (authState: AuthState) => authState.isDeletedFromPlaylist);

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

export const selectArtistsPageState = (state: AppState): ArtistsPageState => state.artists;

export const selectArtists = createSelector(selectArtistsPageState, (artistsState: ArtistsPageState) => artistsState.artists);

export const selectArtistInfoState = (state: AppState): ArtistInfoState => state.artistInfo;

export const selectArtist = createSelector(selectArtistInfoState, (artistState: ArtistInfoState) => artistState.artist);

export const selectPlaylistsPageState = (state: AppState): PlaylistsPageState => state.playlists;

export const selectPlaylists = createSelector(selectPlaylistsPageState, (playlistsState: PlaylistsPageState) => playlistsState.playlists);
export const selectUserPlaylists = createSelector(selectPlaylistsPageState, (playlistsState: PlaylistsPageState) => playlistsState.userPlaylists);

export const selectPlaylistInfoState = (state: AppState): PlaylistInfoState => state.playlistInfo;

export const selectPlaylist = createSelector(selectPlaylistInfoState, (playlistState: PlaylistInfoState) => playlistState.playlist);



