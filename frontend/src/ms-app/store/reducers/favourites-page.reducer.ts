import { createReducer, on } from "@ngrx/store";
import { FavouritesApiActions, FavouritesPageActions } from "../actions";
import { FavouritesPageState, initialFavouritesPageState } from "../state/favourites-page.state";


export const favouritesPageReducer = createReducer(initialFavouritesPageState,
    on(FavouritesPageActions.loadFavourites, (state): FavouritesPageState => ({
        ...state,
    })),
    on(FavouritesApiActions.gotFavouritesSuccess, (state, { tracks }): FavouritesPageState => ({
        ...state,
        tracks,
    })),
    on(FavouritesApiActions.gotFavouritesError, (state, { error }): FavouritesPageState => ({
        ...state,
        error,
    })),
);
