import { createReducer, on } from "@ngrx/store";
import { AudioActions, AudioApiActions } from "../actions";
import { AudioState, initialAudioState } from "../state/audio.state";


export const audioReducer = createReducer(initialAudioState,
    on(AudioActions.playTrack, (state, { track }): AudioState => ({
        ...state,
        trackId: track.id,
        trackArtist: track.artist,
        trackTitle: track.title,
        duration: track.duration,
    })),
    on(AudioApiActions.gotTrackSuccess, (state, { audioBuffer, bufferSource }): AudioState => ({
        ...state,
        isPlaying: true,
        audioBuffer,
        bufferSource,
    })),
    on(AudioApiActions.gotTrackError, (state, { error }): AudioState => ({
        ...state,
        error,
    })),
);
