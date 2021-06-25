export interface MainPageState {
    returnUrl: string;
    isOpenAuthModal: boolean;
    isCloseAuthModal: boolean;
    favouriteList: string[];
    addedToFavouritesError: Error;
}

export const initialMainPageState: MainPageState = {
    returnUrl: "/main/home",
    isOpenAuthModal: false,
    isCloseAuthModal: false,
    favouriteList: [],
    addedToFavouritesError: null,
};
