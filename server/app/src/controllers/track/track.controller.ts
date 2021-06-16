import { Controller, Get, Param, Res } from "@nestjs/common";
import { Response } from "express";
import { TrackService } from "../../services/track/track.service";

@Controller("track")
export class TrackController {

    constructor(private readonly trackService: TrackService) {

    }

    @Get(":id")
    // @Header("Content-Type", "audio/mp3")
    // @Header("Accept-Ranges", "bytes")
    async getTrack(@Param("id") id: string, @Res() res: Response) {
        console.log("id track", id);

        const audioData: Buffer = await this.trackService.getTrack(id);
        console.log(audioData);

        res.type('arraybuffer');
        res.send(audioData);
    }

}
