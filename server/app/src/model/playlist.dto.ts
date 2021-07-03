export interface PlaylistDto {
    id: string;
    title: string;
    description: string;
    trackIds: string[];
    creatorId: string;
    totalLikes: string;
    imagesPath: string[];
}
