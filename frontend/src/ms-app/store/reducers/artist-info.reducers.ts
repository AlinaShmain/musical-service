import { createReducer, on } from "@ngrx/store";
import { ArtistInfoActions, ArtistInfoApiActions } from "../actions";
import { ArtistInfoState, initialArtistInfoState } from "../state/artist-info.state";


export const artistInfoReducer = createReducer(initialArtistInfoState,
    on(ArtistInfoActions.loadArtistInfo, (state): ArtistInfoState => ({
        ...state,
    })),
    on(ArtistInfoApiActions.gotArtistInfoSuccess, (state, { artist }): ArtistInfoState => ({
        ...state,
        artist,
    })),
    on(ArtistInfoApiActions.gotArtistInfoError, (state, { error }): ArtistInfoState => ({
        ...state,
        artistError: error,
    })),
    on(ArtistInfoActions.loadTracks, (state): ArtistInfoState => ({
        ...state,
    })),
    on(ArtistInfoApiActions.gotTracksSuccess, (state, { tracks }): ArtistInfoState => ({
        ...state,
        tracks,
    })),
    on(ArtistInfoApiActions.gotTracksError, (state, { error }): ArtistInfoState => ({
        ...state,
        tracksError: error,
    })),
);
