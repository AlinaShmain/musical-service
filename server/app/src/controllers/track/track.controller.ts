import { Controller, Get, Header, Param } from '@nestjs/common';
import { TrackService } from '../../services/track/track.service';

@Controller('track')
export class TrackController {

    constructor(private readonly trackService: TrackService) {

    }

    @Get(":id")
    // @Header("Content-Type", "audio/mp3")
    @Header("Accept-Ranges", "bytes")
    async getTrack(@Param("id") id: string): Promise<ArrayBuffer | Error>{
        console.log("id track", id);

        return await this.trackService.getTrack(id);
    }

}
