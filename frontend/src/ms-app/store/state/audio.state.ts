export interface AudioState {
    isPlaying: boolean;
    currentTime: string;
    duration: string;
    error: Error;
}

export const initialAudioState: AudioState = {
    isPlaying: false,
    currentTime: "0",
    duration: "0",
    error: null,
};
