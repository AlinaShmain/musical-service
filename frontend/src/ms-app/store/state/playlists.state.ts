import { Playlist } from "src/ms-app/models/playlist";

export interface PlaylistsPageState {
    playlists: Playlist[];
    userPlaylists: Playlist[];
    error: Error;
}

export const initialPlaylistsPageState: PlaylistsPageState = {
    playlists: [],
    userPlaylists: [],
    error: null,
};
