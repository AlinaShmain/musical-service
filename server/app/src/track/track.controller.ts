import { Controller, Get, Header, Param } from '@nestjs/common';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {

    constructor(private readonly trackService: TrackService) {

    }

    @Get(":id")
    @Header("Content-Type", "audio/mp3")
    @Header("accept-ranges", "bytes")
    getTrack(@Param("id") id: string): Promise<ArrayBuffer | Error>{
        console.log("id track", id);

        return this.trackService.getTrack(id);
    }

}
