import { User } from "src/ms-app/models/user";

export interface AuthState {
    authenticated: boolean;
    token: string;
    // isOpenAuthModal: boolean;
    loginError: Error;
    registerError: Error;
    user: User;
}

export const initialAuthState: AuthState = {
    authenticated: false,
    token: "",
    // isOpenAuthModal: false,
    loginError: null,
    registerError: null,
    user: null,
};
