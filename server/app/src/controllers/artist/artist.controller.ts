import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ArtistCollectionService } from 'src/collections/artist-collection/artist-collection';
import { Artist } from 'src/collections/artist-collection/artist.schema';
import { Track } from 'src/collections/track-collection/track.schema';
import { TracksService } from 'src/services/tracks/tracks/tracks.service';

@Controller('artist')
export class ArtistController {

    constructor(private readonly artistsService: ArtistCollectionService,
        private readonly tracksService: TracksService) {

    }

    @Get("/:id")
    find(@Param("id") id: string): Promise<Artist> {
        console.log("get artist info", id);

        return this.artistsService.findById({ id });
    }

    @Post("/tracks")
    findTracks(@Body() { trackIds }): Promise<Track[]> {
        console.log("get artist tracks", trackIds);

        return this.tracksService.findTracks({ trackIds });
    }

}
