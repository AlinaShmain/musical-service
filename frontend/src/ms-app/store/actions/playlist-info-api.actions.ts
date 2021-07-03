import { createAction, props } from "@ngrx/store";
import { Playlist } from "src/ms-app/models/playlist";
import { Track } from "src/ms-app/models/track";

export enum PlaylistInfoApiActionTypes {
    GET_PLAYLIST_INFO_SUCCESS = "[PlaylistInfoPage/API] GetPlaylistInfo Success",
    GET_PLAYLIST_INFO_ERROR = "[PlaylistInfoPage/API] GetPlaylistInfo Error",
    GET_TRACKS_SUCCESS = "[PlaylistInfoPage/API] GetTracks Success",
    GET_TRACKS_ERROR = "[PlaylistInfoPage/API] GetTracks Error",
}

export const gotPlaylistInfoSuccess = createAction(
    PlaylistInfoApiActionTypes.GET_PLAYLIST_INFO_SUCCESS,
    props<{ playlist: Playlist }>(),
);

export const gotPlaylistInfoError = createAction(
    PlaylistInfoApiActionTypes.GET_PLAYLIST_INFO_ERROR,
    props<{ error: Error }>(),
);

export const gotTracksSuccess = createAction(
    PlaylistInfoApiActionTypes.GET_TRACKS_SUCCESS,
    props<{ tracks: Track[] }>(),
);

export const gotTracksError = createAction(
    PlaylistInfoApiActionTypes.GET_TRACKS_ERROR,
    props<{ error: Error }>(),
);

