import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { TrackCollectionService } from 'src/collections/track-collection/track-collection.service';
import { Track } from 'src/collections/track-collection/track.schema';

@Injectable()
export class TracksService {

    constructor(private readonly trackCollectionService: TrackCollectionService) { }

    async findTracks({ trackIds }): Promise<Track[]> {
        try {
            const tracks = await this.trackCollectionService.findByIds({ trackIds });
            console.log("tracks", tracks);

            return tracks;

        } catch (error) {
            console.log(error.message);
            throw new InternalServerErrorException(error.message);
        }
    }

}
