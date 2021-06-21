import { createAction, props } from "@ngrx/store";

export enum MainApiActionTypes {
    ADD_TO_FAVOURITES_SUCCESS = "[MainPage/API] Add To Favourites Success",
    ADD_TO_FAVOURITES_ERROR = "[MainPage/API] Add To Favourites Error",
}

export const addedToFavouritesSuccess = createAction(
    MainApiActionTypes.ADD_TO_FAVOURITES_SUCCESS,
    props<{ favouriteList: string[] }>(),
);

export const addedToFavouritesError = createAction(
    MainApiActionTypes.ADD_TO_FAVOURITES_ERROR,
    props<{ addedToFavouritesError: Error }>(),
);

