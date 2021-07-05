import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PlaylistCollectionService } from 'src/collections/playlist-collection.ts/playlist-collection';
import { Playlist } from 'src/collections/playlist-collection.ts/playlist.schema';
import { Track } from 'src/collections/track-collection/track.schema';
import { TracksService } from 'src/services/tracks/tracks/tracks.service';

@Controller('playlist')
export class PlaylistController {
    
    constructor(private readonly playlistService: PlaylistCollectionService,
        private readonly tracksService: TracksService) {

    }

    @Get("/:id")
    find(@Param("id") id: string): Promise<Playlist> {
        console.log("get playlist info", id);

        return this.playlistService.findById({ playlistId: id });
    }

    @Post("/tracks")
    findTracks(@Body() { trackIds }): Promise<Track[]> {
        console.log("get artist tracks", trackIds);

        return this.tracksService.findTracks({ trackIds });
    }
    
}
