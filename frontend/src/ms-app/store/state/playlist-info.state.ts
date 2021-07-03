import { Playlist } from "src/ms-app/models/playlist";
import { Track } from "src/ms-app/models/track";

export interface PlaylistInfoState {
    playlist: Playlist;
    playlistError: Error;
    tracks: Track[];
    tracksError: Error;
}

export const initialPlaylistInfoState: PlaylistInfoState = {
    playlist: null,
    playlistError: null,
    tracks: [],
    tracksError: null,
};
