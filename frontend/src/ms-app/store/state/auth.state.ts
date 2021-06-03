export interface AuthState {
    authenticated: boolean;
    token: string;
    isOpenAuthModal: boolean;
}

export const initialAuthState: AuthState = {
    authenticated: false,
    token: "",
    isOpenAuthModal: false,
};
