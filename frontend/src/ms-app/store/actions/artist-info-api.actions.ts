import { createAction, props } from "@ngrx/store";
import { Artist } from "src/ms-app/models/artist";
import { Track } from "src/ms-app/models/track";

export enum ArtistInfoApiActionTypes {
    GET_ARTIST_INFO_SUCCESS = "[ArtistInfoPage/API] GetArtistInfo Success",
    GET_ARTIST_INFO_ERROR = "[ArtistInfoPage/API] GetArtistInfo Error",
    GET_TRACKS_SUCCESS = "[ArtistInfoPage/API] GetTracks Success",
    GET_TRACKS_ERROR = "[ArtistInfoPage/API] GetTracks Error",
}

export const gotArtistInfoSuccess = createAction(
    ArtistInfoApiActionTypes.GET_ARTIST_INFO_SUCCESS,
    props<{ artist: Artist }>(),
);

export const gotArtistInfoError = createAction(
    ArtistInfoApiActionTypes.GET_ARTIST_INFO_ERROR,
    props<{ error: Error }>(),
);

export const gotTracksSuccess = createAction(
    ArtistInfoApiActionTypes.GET_TRACKS_SUCCESS,
    props<{ tracks: Track[] }>(),
);

export const gotTracksError = createAction(
    ArtistInfoApiActionTypes.GET_TRACKS_ERROR,
    props<{ error: Error }>(),
);

