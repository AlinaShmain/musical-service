import { Controller, Get } from '@nestjs/common';
import { Track } from 'src/collections/track-collection/track.schema';
import { TrackCollectionService } from '../../collections/track-collection/track-collection.service';

@Controller('tracks')
export class TracksController {

    constructor(private readonly tracksService: TrackCollectionService) {

    }

    @Get()
    findAll(): Promise<Track[]> {
        console.log("get tracks");
        // console.log(await this.tracksService.findAll());
        return this.tracksService.findAllTracks();
    }
    
}
