import { Controller, Get } from '@nestjs/common';
import { Track } from '../model/track.dto';
import { TracksService } from './tracks.service';

@Controller('tracks')
export class TracksController {

    constructor(private readonly tracksService: TracksService) {

    }

    @Get()
    findAll(): Track[] {
        console.log("get tracks");
        return this.tracksService.getAll()
    }
    
}
