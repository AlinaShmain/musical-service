export interface User {
    _id?: number;
    name?: string;
    email: string;
    password?: string;
    favouriteTracks: string[];
    playlistIds: string[];
}
