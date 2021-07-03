// import { combineReducers } from "@ngrx/store";
import { artistInfoReducer } from "./artist-info.reducers";
import { artistsPageReducer } from "./artists-page.reducers";
import { audioReducer } from "./audio.reducer";
import { authReducer } from "./auth.reducer";
import { favouritesPageReducer } from "./favourites-page.reducer";
import { homePageReducer } from "./home-page.reducer";
import { mainPageReducer } from "./main-page.reducer";
import { playlistInfoReducer } from "./playlist-info.reducers";
import { playlistsPageReducer } from "./playlists.reducers";

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
    artists: artistsPageReducer,
    artistInfo: artistInfoReducer,
    playlists: playlistsPageReducer,
    playlistInfo: playlistInfoReducer,
};
