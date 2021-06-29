import { createReducer, on } from "@ngrx/store";
import { MainPageActions } from "../actions";
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
     on(MainPageActions.onCloseModal, (state): MainPageState => ({
        ...state,
        isCloseAuthModal: true,
    })),
);
