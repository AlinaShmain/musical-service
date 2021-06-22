import { createAction, props } from "@ngrx/store";
import { Track } from "src/ms-app/models/track";

export enum AudioActionTypes {
    LOAD_TRACK_LIST = "[Audio] Load TrackList",
    PLAY_TRACK = "[Audio] Play Track",
    UPDATE_CURRENT_TIME = "[Audio] Update CurrentTime",
    END_PLAYING = "[Audio] Stop Playing",
    PAUSE_PLAYING = "[Audio] Pause Playing",
    RESUME_PLAYING = "[Audio] Resume Playing",
    RESET_TRACK_DATA = "[Audio] Reset TrackData",
    MUTE_VOLUME = "[Audio] Mute",
    UNMUTE_VOLUME = "[Audio] Unmute",
    SET_VOLUME = "[Audio] Set Volume",
}

export const loadTrackList = createAction(
    AudioActionTypes.LOAD_TRACK_LIST,
    props<{ currTrackList: Track[] }>(),
);

export const playTrack = createAction(
    AudioActionTypes.PLAY_TRACK,
    props<{ track: Track }>(),
);

export const updateCurrentTime = createAction(
    AudioActionTypes.UPDATE_CURRENT_TIME,
    props<{ currentTime: string }>(),
);

export const endPlaying = createAction(
    AudioActionTypes.END_PLAYING,
);

export const pausePlaying = createAction(
    AudioActionTypes.PAUSE_PLAYING,
);

export const resumePlaying = createAction(
    AudioActionTypes.RESUME_PLAYING,
    props<{ currentTime: string, audioBuffer: AudioBuffer }>(),
);

export const resetTrackData = createAction(
    AudioActionTypes.RESET_TRACK_DATA,
);

export const muteVolume = createAction(
    AudioActionTypes.MUTE_VOLUME,
);

export const unmuteVolume = createAction(
    AudioActionTypes.UNMUTE_VOLUME,
);

export const setVolume = createAction(
    AudioActionTypes.SET_VOLUME,
    props<{ volume: string }>(),
);


