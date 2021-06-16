import { createReducer, on } from "@ngrx/store";
import { HomeApiActions, HomePageActions } from "../actions";
import { HomePageState, initialHomePageState } from "../state/home-page.state";


export const homePageReducer = createReducer(initialHomePageState,
    on(HomePageActions.getTracks, (state): HomePageState => ({
        ...state,
    })),
    on(HomeApiActions.gotTracksSuccess, (state, { tracks }): HomePageState => ({
        ...state,
        tracks,
    })),
    on(HomeApiActions.gotTracksError, (state, { error }): HomePageState => ({
        ...state,
        error,
    })),
);
