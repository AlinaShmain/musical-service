import { Controller, Get } from '@nestjs/common';
import { ArtistCollectionService } from 'src/collections/artist-collection/artist-collection';
import { Artist } from 'src/collections/artist-collection/artist.schema';

@Controller('artists')
export class ArtistsController {

    constructor(private readonly artistsService: ArtistCollectionService) {

    }

    @Get()
    findAll(): Promise<Artist[]> {
        console.log("get artists");

        return this.artistsService.findAllArtists();
    }

}

