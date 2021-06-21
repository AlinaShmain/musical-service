import { Body, Controller, Post } from '@nestjs/common';
import { FavouritesService } from 'src/services/favourites/favourites.service';

@Controller('favourites')
export class FavouritesController {

    constructor(private favouritesService: FavouritesService) {
    }

    @Post()
    async create(@Body() { trackId, userEmail }): Promise<void> {
        console.log("trackId", trackId);
        console.log("userEmail", userEmail);

        return await this.favouritesService.addToFavourites({trackId, userEmail});
    }
}
