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
        loginError: null,
    })),
    on(AuthActions.registerUser, (state, { user }): AuthState => ({
        ...state,
        user,
        registerError: null,
    })),
    on(AuthApiActions.loggedSuccess, (state, { token, userInfo }): AuthState => ({
        ...state,
        authenticated: true,
        token,
        user: userInfo,
        loginError: null,
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
        registerError: null,
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
    on(AuthActions.likeTrack, (state, { trackId }): AuthState => ({
        ...state,
        user: {
            ...state.user,
            favouriteTracks: [...state.user.favouriteTracks, trackId],
        }
    })),
    on(AuthApiActions.addedToFavouritesSuccess, (state, { favouriteTracks }): AuthState => ({
        ...state,
        user: {
            ...state.user,
            favouriteTracks,
        }
    })),
    on(AuthApiActions.addedToFavouritesError, (state, { addedToFavouritesError }): AuthState => ({
        ...state,
        addedToFavouritesError,
        user: {
            ...state.user,
            favouriteTracks: state.user.favouriteTracks.slice(0, state.user.favouriteTracks.length - 1),
        }
    })),
    on(AuthActions.dislikeTrack, (state, { trackId }): AuthState => ({
        ...state,
        user: {
            ...state.user,
            favouriteTracks: state.user.favouriteTracks.filter((id) => id !== trackId)
        }
    })),
    on(AuthApiActions.deletedFromFavouritesSuccess, (state, { favouriteTracks }): AuthState => ({
        ...state,
        user: {
            ...state.user,
            favouriteTracks,
        }
    })),
    on(AuthApiActions.deletedFromFavouritesError, (state, { deletedFromFavouritesError, trackId }): AuthState => ({
        ...state,
        deletedFromFavouritesError,
        user: {
            ...state.user,
            favouriteTracks: [...state.user.favouriteTracks, trackId],
        }
    })),
    on(AuthActions.createPlaylist, (state): AuthState => ({
        ...state,
        // user: {
        //     ...state.user,
        //     playlistIds: [...state.user.playlistIds, playlist.id],
        // }
    })),
    on(AuthApiActions.createdPlaylistSuccess, (state, { playlistIds }): AuthState => ({
        ...state,
        isCreated: true,
        user: {
            ...state.user,
            playlistIds,
        }
    })),
    on(AuthApiActions.createdPlaylistError, (state, { createdPlaylistError, playlist }): AuthState => ({
        ...state,
        isCreated: false,
        createdPlaylistError,
    })),
    on(AuthActions.editPlaylist, (state): AuthState => ({
        ...state,
    })),
    on(AuthApiActions.editedPlaylistSuccess, (state): AuthState => ({
        ...state,
        isEdited: true,
    })),
    on(AuthApiActions.editedPlaylistError, (state, { editedPlaylistError }): AuthState => ({
        ...state,
        isEdited: false,
        editedPlaylistError,
    })),
    on(AuthActions.deletePlaylist, (state): AuthState => ({
        ...state,
    })),
    on(AuthApiActions.deletedPlaylistSuccess, (state): AuthState => ({
        ...state,
        isDeleted: true,
    })),
    on(AuthApiActions.deletedPlaylistError, (state, { deletedPlaylistError }): AuthState => ({
        ...state,
        isDeleted: false,
        deletedPlaylistError,
    })),
    on(AuthActions.deleteFromPlaylist, (state): AuthState => ({
        ...state,
    })),
    on(AuthApiActions.deletedFromPlaylistSuccess, (state, { trackIds }): AuthState => ({
        ...state,
        isDeletedFromPlaylist: true,
    })),
    on(AuthApiActions.deletedFromPlaylistError, (state, { deletedFromPlaylistError }): AuthState => ({
        ...state,
        isDeletedFromPlaylist: false,
        deletedFromPlaylistError,
    })),
);
