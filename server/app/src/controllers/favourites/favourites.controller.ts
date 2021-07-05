import { Body, Controller, Get, Post } from '@nestjs/common';
import { Track } from 'src/collections/track-collection/track.schema';
import { FavouritesService } from 'src/services/favourites/favourites.service';

@Controller('favourites')
export class FavouritesController {

    constructor(private favouritesService: FavouritesService) {
    }

    @Post("add")
    async add(@Body() { trackId, decoded }): Promise<{favouriteTracks: string[]}> {
        console.log("add trackId", trackId);

        return await this.favouritesService.addToFavourites({ trackId, email: decoded.email });
    }

    @Post("delete")
    async delete(@Body() { trackId, decoded }): Promise<{favouriteTracks: string[]}> {
        console.log("delete trackId", trackId);

        return await this.favouritesService.deleteFromFavourites({ trackId, email: decoded.email });
    }

    @Get()
    async findAll(@Body() { decoded }): Promise<Track[]> {
        console.log("get favourites", decoded);

        return await this.favouritesService.findFavourites({ email: decoded.email });
    }

}
