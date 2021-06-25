import { UserDto } from "./user.dto";

export interface AuthInfoDto {
    token: string;
    userInfo: UserDto;
}