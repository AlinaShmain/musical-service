import { createReducer, on } from "@ngrx/store";
import { MainApiActions, MainPageActions } from "../actions";
import { initialMainPageState, MainPageState } from "../state/main-page.state";


export const mainPageReducer = createReducer(initialMainPageState,
    on(MainPageActions.setReturnUrl, (state, { returnUrl }): MainPageState => ({
        ...state,
        returnUrl,
    })),
    on(MainPageActions.setIsOpenAuthModal, (state, { isOpenAuthModal }): MainPageState => ({
        ...state,
        isOpenAuthModal,
    })),
    on(MainPageActions.likeTrack, (state): MainPageState => ({
        ...state,
    })),
    on(MainApiActions.addedToFavouritesSuccess, (state, { favouriteList }): MainPageState => ({
        ...state,
        favouriteList,
    })),
    on(MainApiActions.addedToFavouritesError, (state, { addedToFavouritesError }): MainPageState => ({
        ...state,
        addedToFavouritesError,
    })),
);
