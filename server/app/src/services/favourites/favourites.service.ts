import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { TrackCollectionService } from 'src/collections/track-collection/track-collection.service';
import { Track } from 'src/collections/track-collection/track.schema';
import { UserCollectionService } from 'src/collections/user-collection/user-collection.service';
import { UserDto } from 'src/model/user.dto';

@Injectable()
export class FavouritesService {

    constructor(private readonly userCollectionService: UserCollectionService,
        private readonly trackCollectionService: TrackCollectionService) { }

    async addToFavourites({ trackId, email }): Promise<{ favouriteTracks: string[] }> {
        try {
            if(!trackId) throw new Error();
            return await this.userCollectionService.addFavourite({ trackId, email });
        } catch (error) {
            console.log(error.message);
            throw new InternalServerErrorException(error.message);
        }

    }

    async deleteFromFavourites({ trackId, email }): Promise<{ favouriteTracks: string[] }> {
        try {
            if(!trackId) throw new Error();
            return await this.userCollectionService.deleteFavourite({ trackId, email });
        } catch (error) {
            console.log(error.message);
            throw new InternalServerErrorException(error.message);
        }

    }

    async findFavourites({ email }): Promise<Track[]> {
        try {
            const foundUser: UserDto = await this.userCollectionService.findByEmail({ email });

            const tracks = await this.trackCollectionService.findByIds({ trackIds: foundUser.favouriteTracks });
            console.log("tracks", tracks);

            return tracks;

        } catch (error) {
            console.log(error.message);
            throw new InternalServerErrorException(error.message);
        }
    }

}
