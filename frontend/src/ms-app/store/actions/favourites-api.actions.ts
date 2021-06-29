import { createAction, props } from "@ngrx/store";
import { Track } from "src/ms-app/models/track";

export enum FavouritesApiActionTypes {
    GET_FAVOURITES_SUCCESS = "[FavouritesPage/API] GetFavourites Success",
    GET_FAVOURITES_ERROR = "[FavouritesPage/API] GetFavourites Error",
}

export const gotFavouritesSuccess = createAction(
    FavouritesApiActionTypes.GET_FAVOURITES_SUCCESS,
    props<{ tracks: Track[] }>(),
);

export const gotFavouritesError = createAction(
    FavouritesApiActionTypes.GET_FAVOURITES_ERROR,
    props<{ error: Error }>(),
);

