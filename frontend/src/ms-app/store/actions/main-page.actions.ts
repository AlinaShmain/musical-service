import { createAction, props } from "@ngrx/store";

export enum MainActionTypes {
    SET_RETURN_URL = "[MainPage] Set ReturnUrl",
    SET_IS_OPEN_AUTH_MODAL = "[MainPage] Set IsOpenAuthModal",
    LIKE_TRACK = "[MainPage] Like Track",
}

export const setReturnUrl = createAction(
    MainActionTypes.SET_RETURN_URL,
    props<{ returnUrl: string }>(),
);

export const setIsOpenAuthModal = createAction(
    MainActionTypes.SET_IS_OPEN_AUTH_MODAL,
    props<{ isOpenAuthModal: boolean }>(),
);

export const likeTrack = createAction(
    MainActionTypes.LIKE_TRACK,
    props<{ trackId: string, userEmail: string }>(),
);

