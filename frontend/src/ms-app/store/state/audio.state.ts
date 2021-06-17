// AudioContext = window.AudioContext || window.webkitAudioContext;
export interface AudioState {
    trackId: string;
    trackTitle: string;
    trackArtist: string;
    // audioCtx: AudioContext;
    audioBuffer: AudioBuffer;
    bufferSource: AudioBufferSourceNode;
    isPlaying: boolean;
    currentTime: string;
    duration: string;
    stoppedAt: number;
    isEnded: boolean;
    error: Error;
}

export const initialAudioState: AudioState = {
    trackId: null,
    trackTitle: null,
    trackArtist: null,
    audioBuffer: null,
    bufferSource: null,
    isPlaying: false,
    currentTime: "0",
    duration: "0",
    stoppedAt: null,
    isEnded: false,
    error: null,
};
