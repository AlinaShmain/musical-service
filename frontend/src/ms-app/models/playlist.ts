export interface Playlist {
    id: string;
    title: string;
    description: string;
    trackIds?: string[];
    creatorId?: string;
    totalLikes?: string;
    imagesPath?: string[];
}
