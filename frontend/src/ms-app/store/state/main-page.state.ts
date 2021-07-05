export interface MainPageState {
    returnUrl: string;
    isOpenAuthModal: boolean;
    isCloseAuthModal: boolean;
    // addedToFavouritesError: Error;
}

export const initialMainPageState: MainPageState = {
    returnUrl: "/main/home",
    isOpenAuthModal: false,
    isCloseAuthModal: false,
    // addedToFavouritesError: null,
};
