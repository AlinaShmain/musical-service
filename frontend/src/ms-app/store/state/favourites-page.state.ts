import { Track } from "src/ms-app/models/track";

export interface FavouritesPageState {
    tracks: Track[];
    error: Error;
}

export const initialFavouritesPageState: FavouritesPageState = {
    tracks: [],
    error: null,
};
