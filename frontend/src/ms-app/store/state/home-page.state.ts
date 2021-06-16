import { Track } from "src/ms-app/models/track";

export interface HomePageState {
    tracks: Track[];
    error: Error;
}

export const initialHomePageState: HomePageState = {
    tracks: [],
    error: null,
};
