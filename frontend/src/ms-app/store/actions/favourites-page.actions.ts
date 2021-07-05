import { createAction, props } from "@ngrx/store";

export enum FavouritesActionTypes {
    LOAD_FAVOURITES = "[FavouritesPage] Load Favourites",
}

export const loadFavourites = createAction(
    FavouritesActionTypes.LOAD_FAVOURITES,
    props<{ token: string }>(),
);


