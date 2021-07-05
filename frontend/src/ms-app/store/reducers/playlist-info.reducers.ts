import { createReducer, on } from "@ngrx/store";
import { PlaylistInfoActions, PlaylistInfoApiActions } from "../actions";
import { initialPlaylistInfoState, PlaylistInfoState } from "../state/playlist-info.state";


export const playlistInfoReducer = createReducer(initialPlaylistInfoState,
    on(PlaylistInfoActions.loadPlaylistInfo, (state): PlaylistInfoState => ({
        ...state,
    })),
    on(PlaylistInfoApiActions.gotPlaylistInfoSuccess, (state, { playlist }): PlaylistInfoState => ({
        ...state,
        playlist,
    })),
    on(PlaylistInfoApiActions.gotPlaylistInfoError, (state, { error }): PlaylistInfoState => ({
        ...state,
        playlistError: error,
    })),
    on(PlaylistInfoActions.loadTracks, (state): PlaylistInfoState => ({
        ...state,
    })),
    on(PlaylistInfoApiActions.gotTracksSuccess, (state, { tracks }): PlaylistInfoState => ({
        ...state,
        tracks,
    })),
    on(PlaylistInfoApiActions.gotTracksError, (state, { error }): PlaylistInfoState => ({
        ...state,
        tracksError: error,
    })),
);
