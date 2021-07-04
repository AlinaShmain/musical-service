import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PlaylistCollectionService } from 'src/collections/playlist-collection.ts/playlist-collection';
import { Playlist } from 'src/collections/playlist-collection.ts/playlist.schema';
import { TrackCollectionService } from 'src/collections/track-collection/track-collection.service';
import { UserCollectionService } from 'src/collections/user-collection/user-collection.service';

@Injectable()
export class PlaylistsService {

    constructor(private readonly userCollectionService: UserCollectionService,
        private readonly playlistCollectionService: PlaylistCollectionService,
        private readonly trackCollectionService: TrackCollectionService) { }

    async findUserPlaylists({ email }): Promise<Playlist[]> {
        try {
            const { playlistIds } = await this.userCollectionService.findByEmail({ email });

            const playlists = await this.playlistCollectionService.findByIds({ playlistIds });
            console.log("playlists", playlists);

            return playlists;

        } catch (error) {
            console.log(error.message);
            throw new InternalServerErrorException(error.message);
        }
    }

    async addToPlaylist({ trackId, playlistId }): Promise<{ trackIds: string[] }> {
        try {
            if (!trackId || !playlistId) throw new Error();

            const { imagesPath } = await this.playlistCollectionService.findById({ playlistId });
            console.log("images paths", imagesPath);

            if (imagesPath.length < 4) {
                const { imagePath } = await this.trackCollectionService.findById({ id: trackId });

                await this.playlistCollectionService.addImagePlaylist({ playlistId, imagePath });
            }

            return await this.playlistCollectionService.addToPlaylist({ trackId, playlistId });
        } catch (error) {
            console.log(error.message);
            throw new InternalServerErrorException(error.message);
        }
    }

    async createPlaylist({ playlistInfo, email }): Promise<{ playlistIds: string[] }> {
        try {
            if (!playlistInfo) throw new Error();

            if (playlistInfo.trackIds.length > 0) {
                const { imagePath } = await this.trackCollectionService.findById({ id: playlistInfo.trackIds[0] });

                await this.playlistCollectionService.createPlaylist({ ...playlistInfo, imagesPath: [imagePath] });
            } else {
                await this.playlistCollectionService.createPlaylist(playlistInfo);
            }

            return await this.userCollectionService.addPlaylistId({ email, playlistId: playlistInfo.id });

        } catch (error) {
            console.log(error.message);
            throw new InternalServerErrorException(error.message);
        }
    }

    async editPlaylist({ playlistInfo }): Promise<Playlist> {
        try {
            if (!playlistInfo) throw new Error();

            return await this.playlistCollectionService.editPlaylist(playlistInfo);
        } catch (error) {
            console.log(error.message);
            throw new InternalServerErrorException(error.message);
        }
    }

    async deletePlaylist({ playlistId }): Promise<{ playlistId: string }> {
        try {
            if (!playlistId) throw new Error();

            return await this.playlistCollectionService.deletePlaylist(playlistId);
        } catch (error) {
            console.log(error.message);
            throw new InternalServerErrorException(error.message);
        }
    }

    async deleteFromPlaylist({ playlistId, trackId }): Promise<{ trackIds: string[] }> {
        try {
            if (!playlistId && !trackId) throw new Error();

            if (trackId <= 4) {
                const { imagePath } = await this.trackCollectionService.findById({ id: trackId });

                await this.playlistCollectionService.deleteImagePlaylist({ playlistId, imagePath });
            }

            return await this.playlistCollectionService.deleteFromPlaylist({ playlistId, trackId });
        } catch (error) {
            console.log(error.message);
            throw new InternalServerErrorException(error.message);
        }
    }

}
