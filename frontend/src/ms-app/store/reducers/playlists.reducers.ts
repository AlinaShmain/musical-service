import { createReducer, on } from "@ngrx/store";
import { PlaylistsApiActions, PlaylistsPageActions } from "../actions";
import { initialPlaylistsPageState, PlaylistsPageState } from "../state/playlists.state";


export const playlistsPageReducer = createReducer(initialPlaylistsPageState,
    on(PlaylistsPageActions.loadPlaylists, (state): PlaylistsPageState => ({
        ...state,
    })),
    on(PlaylistsApiActions.gotPlaylistsSuccess, (state, { playlists }): PlaylistsPageState => ({
        ...state,
        playlists,
    })),
    on(PlaylistsApiActions.gotPlaylistsError, (state, { error }): PlaylistsPageState => ({
        ...state,
        error,
    })),
    on(PlaylistsPageActions.loadUserPlaylists, (state): PlaylistsPageState => ({
        ...state,
    })),
    on(PlaylistsApiActions.gotUserPlaylistsSuccess, (state, { userPlaylists }): PlaylistsPageState => ({
        ...state,
        userPlaylists,
    })),
    on(PlaylistsApiActions.gotUserPlaylistsError, (state, { error }): PlaylistsPageState => ({
        ...state,
        error,
        userPlaylists: [],
    })),
);
