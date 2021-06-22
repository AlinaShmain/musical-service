import { Track } from "src/ms-app/models/track";

// AudioContext = window.AudioContext || window.webkitAudioContext;
export interface AudioState {
    trackId: string;
    trackTitle: string;
    trackArtist: string;
    currTrackList: Track[];
    // audioCtx: AudioContext;
    audioBuffer: AudioBuffer;
    bufferSource: AudioBufferSourceNode;
    isPlaying: boolean;
    currentTime: string;
    duration: string;
    isEnded: boolean;
    error: Error;
    isMuted: boolean;
    volumeBeforeMute: string;
    volume: string;
}

export const initialAudioState: AudioState = {
    trackId: null,
    trackTitle: null,
    trackArtist: null,
    currTrackList: [],
    audioBuffer: null,
    bufferSource: null,
    isPlaying: false,
    currentTime: "0",
    duration: "0",
    isEnded: false,
    error: null,
    isMuted: false,
    volumeBeforeMute: "",
    volume: "0.5",
};
