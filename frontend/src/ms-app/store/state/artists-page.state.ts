import { Artist } from "src/ms-app/models/artist";

export interface ArtistsPageState {
    artists: Artist[];
    error: Error;
}

export const initialArtistsPageState: ArtistsPageState = {
    artists: [],
    error: null,
};
