export interface MainPageState {
    returnUrl: string;
    isOpenAuthModal: boolean;
    favouriteList: string[];
    addedToFavouritesError: Error;
}

export const initialMainPageState: MainPageState = {
    returnUrl: "/",
    isOpenAuthModal: false,
    favouriteList: [],
    addedToFavouritesError: null,
};
