import { User } from "src/ms-app/models/user";

export interface AuthState {
    authenticated: boolean;
    token: string;
    loginError: Error;
    registerError: Error;
    verifyError: Error;
    user: User;
    addedToFavouritesError: Error;
    deletedFromFavouritesError: Error;
    isCreated: boolean;
    isEdited: boolean;
    createdPlaylistError: Error;
    editedPlaylistError: Error;
}

export const initialAuthState: AuthState = {
    authenticated: false,
    token: "",
    loginError: null,
    registerError: null,
    verifyError: null,
    user: null,
    addedToFavouritesError: null,
    deletedFromFavouritesError: null,
    isCreated: null,
    isEdited: null,
    createdPlaylistError: null,
    editedPlaylistError: null,
};
