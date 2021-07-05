import { createReducer, on } from "@ngrx/store";
import { ArtistsApiActions, ArtistsPageActions } from "../actions";
import { ArtistsPageState, initialArtistsPageState } from "../state/artists-page.state";


export const artistsPageReducer = createReducer(initialArtistsPageState,
    on(ArtistsPageActions.loadArtists, (state): ArtistsPageState => ({
        ...state,
    })),
    on(ArtistsApiActions.gotArtistsSuccess, (state, { artists }): ArtistsPageState => ({
        ...state,
        artists,
    })),
    on(ArtistsApiActions.gotArtistsError, (state, { error }): ArtistsPageState => ({
        ...state,
        error,
    })),
);
