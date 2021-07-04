import { createAction, props } from "@ngrx/store";

export enum MainActionTypes {
    SET_RETURN_URL = "[MainPage] Set ReturnUrl",
    ON_CLOSE_MODAL = "[MainPage] OnClose Modal",
    SET_IS_OPEN_AUTH_MODAL = "[MainPage] Set IsOpenAuthModal",
}

export const setReturnUrl = createAction(
    MainActionTypes.SET_RETURN_URL,
    props<{ returnUrl: string }>(),
);

export const onCloseModal = createAction(
    MainActionTypes.ON_CLOSE_MODAL,
);

export const setIsOpenAuthModal = createAction(
    MainActionTypes.SET_IS_OPEN_AUTH_MODAL,
    props<{ isOpenAuthModal: boolean }>(),
);


