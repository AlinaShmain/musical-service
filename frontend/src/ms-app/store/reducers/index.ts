// import { combineReducers } from "@ngrx/store";
import { audioReducer } from "./audio.reducer";
import { authReducer } from "./auth.reducer";
import { favouritesPageReducer } from "./favourites-page.reducer";
import { homePageReducer } from "./home-page.reducer";
import { mainPageReducer } from "./main-page.reducer";

// export const rootReducer = combineReducers({
//     auth: authReducer,
//     audio: audioReducer
// });

export const reducers = {
    auth: authReducer,
    audio: audioReducer,
    home: homePageReducer,
    main: mainPageReducer,
    favourites: favouritesPageReducer,
};
