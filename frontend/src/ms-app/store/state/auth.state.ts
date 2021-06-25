import { User } from "src/ms-app/models/user";

export interface AuthState {
    authenticated: boolean;
    token: string;
    loginError: Error;
    registerError: Error;
    verifyError: Error;
    user: User;
}

export const initialAuthState: AuthState = {
    authenticated: false,
    token: "",
    loginError: null,
    registerError: null,
    verifyError: null,
    user: null,
};
