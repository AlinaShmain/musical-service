export interface UserDto {
    _id?: number;
    name?: string;
    email: string;
    password: string;
    favouriteTracks: string[];
    // admin: boolean,
}
