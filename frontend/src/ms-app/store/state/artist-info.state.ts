import { Artist } from "src/ms-app/models/artist";
import { Track } from "src/ms-app/models/track";

export interface ArtistInfoState {
    artist: Artist;
    artistError: Error;
    tracks: Track[];
    tracksError: Error;
}

export const initialArtistInfoState: ArtistInfoState = {
    artist: null,
    artistError: null,
    tracks: [],
    tracksError: null,
};
