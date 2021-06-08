// import { combineReducers } from "@ngrx/store";
import { audioReducer } from "./audio.reducer";
import { authReducer } from "./auth.reducer";

// export const rootReducer = combineReducers({
//     auth: authReducer,
//     audio: audioReducer
// });

export const reducers = {
    auth: authReducer,
    audio: audioReducer
};
