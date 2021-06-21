import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserCollectionService } from 'src/collections/user-collection/user-collection.service';
import { UserDto } from 'src/model/user.dto';

@Injectable()
export class FavouritesService {

    constructor(private readonly userCollectionService: UserCollectionService) {}

    async addToFavourites({trackId, userEmail}): Promise<void> {
        const foundUser: UserDto = await this.userCollectionService.findByEmail({ email: userEmail });

        try {
            await this.userCollectionService.updateFavourites({trackId, userEmail});

        } catch (error) {
            console.log(error.message);
            throw new InternalServerErrorException(error.message);
        }

    }
}
