import { createReducer } from "@ngrx/store";
import { initialAudioState } from "../state/audio.state";


export const audioReducer = createReducer(initialAudioState,
);
