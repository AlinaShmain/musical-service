import { User } from "./user";

export interface AuthInfo {
    token: string;
    userInfo: User;
}
