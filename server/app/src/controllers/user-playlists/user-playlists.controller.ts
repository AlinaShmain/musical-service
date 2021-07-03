import { Body, Controller, Get, Post } from '@nestjs/common';
import { Playlist } from 'src/collections/playlist-collection.ts/playlist.schema';
import { PlaylistsService } from 'src/services/playlists/playlists.service';

@Controller('user-playlists')
export class UserPlaylistsController {

    constructor(private readonly playlistsService: PlaylistsService) { }

    @Get()
    async find(@Body() { decoded }): Promise<Playlist[]> {
        console.log("get user playlists", decoded);

        return await this.playlistsService.findUserPlaylists({ email: decoded.email });
    }

    @Post("add")
    async add(@Body() { trackId, playlistId, decoded }): Promise<{ trackIds: string[] }> {
        console.log("add track to user playlist", decoded);

        return await this.playlistsService.addToPlaylist({ trackId, playlistId });
    }

    @Post("create")
    async create(@Body() { playlistInfo, decoded }): Promise<{ playlistIds: string[] }> {
        console.log("create playlist", playlistInfo);

        return await this.playlistsService.createPlaylist({ playlistInfo, email: decoded.email });
    }

    @Post("edit")
    async edit(@Body() { playlistInfo, decoded }): Promise<Playlist> {
        console.log("edit playlist", playlistInfo);

        return await this.playlistsService.editPlaylist({ playlistInfo });
    }

}
