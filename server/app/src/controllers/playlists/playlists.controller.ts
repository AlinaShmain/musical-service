import { Controller, Get } from '@nestjs/common';
import { PlaylistCollectionService } from 'src/collections/playlist-collection.ts/playlist-collection';
import { Playlist } from 'src/collections/playlist-collection.ts/playlist.schema';

@Controller('playlists')
export class PlaylistsController {

    constructor(private readonly playlistsService: PlaylistCollectionService) {

    }

    @Get()
    findAll(): Promise<Playlist[]> {
        console.log("get playlists");

        return this.playlistsService.findAllPlaylists();
    }

}
