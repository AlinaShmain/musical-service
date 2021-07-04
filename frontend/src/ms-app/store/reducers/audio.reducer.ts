import { createReducer, on } from "@ngrx/store";
import { AudioActions, AudioApiActions } from "../actions";
import { AudioState, initialAudioState } from "../state/audio.state";


export const audioReducer = createReducer(initialAudioState,
    on(AudioActions.loadTrackList, (state, { currTrackList }): AudioState => ({
        ...state,
        currTrackList,
    })),
    on(AudioActions.playTrack, (state, { track }): AudioState => ({
        ...state,
        trackId: track.id,
        trackArtist: track.artist,
        trackTitle: track.title,
        trackImage: track.imagePath,
        duration: track.duration,
        isEnded: false,
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
        isEnded: true,
    })),
    on(AudioActions.updateCurrentTime, (state, { currentTime }): AudioState => ({
        ...state,
        currentTime,
    })),
    on(AudioActions.endPlaying, (state): AudioState => ({
        ...state,
        isPlaying: false,
        isEnded: true,
        audioBuffer: null,
        bufferSource: null,
        currentTime: "0",
        duration: "0",
        // trackId: null,
        trackTitle: null,
        trackArtist: null,
        trackImage: null,
    })),
    on(AudioActions.resetTrackData, (state): AudioState => ({
        ...state,
        audioBuffer: null,
        currentTime: "0",
        duration: "0",
        trackTitle: null,
        trackArtist: null,
        trackImage: null,
    })),
    on(AudioActions.pausePlaying, (state): AudioState => ({
        ...state,
        isPlaying: false,
        bufferSource: null,
    })),
    on(AudioActions.resumePlaying, (state): AudioState => ({
        ...state,
        isPlaying: true,
    })),
    on(AudioApiActions.playSuccess, (state, { bufferSource }): AudioState => ({
        ...state,
        bufferSource,
    })),
    on(AudioActions.muteVolume, (state): AudioState => ({
        ...state,
        isMuted: true,
        volumeBeforeMute: state.volume,
        volume: "0",
    })),
    on(AudioActions.unmuteVolume, (state): AudioState => ({
        ...state,
        isMuted: false,
        volume: state.volumeBeforeMute,
    })),
    on(AudioActions.setVolume, (state, { volume }): AudioState => ({
        ...state,
        volume,
    })),
    on(AudioActions.deleteTrack, (state, { trackId }): AudioState => ({
        ...state,
        currTrackList: state.currTrackList.filter((track) => track.id !== trackId),
    })),
);
