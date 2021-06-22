import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { resolve } from 'path';
import { TrackCollectionService } from 'src/collections/track-collection/track-collection.service';
import { TrackDto } from 'src/model/track.dto';

@Injectable()
export class TrackService {

    constructor(private readonly trackCollectionService: TrackCollectionService) {}

    async findTrack(id: string): Promise<TrackDto> {
        return await this.trackCollectionService.findById({ id });
    }

    readFile(path: string): Promise<Buffer> {
        const filepath = resolve(__dirname, "../", "../", "../", "./src", "./music-storage", path);
        console.log("full filepath", filepath);

        return new Promise(function (resolve, reject) {
            fs.readFile(filepath, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    }

    async getTrack(id: string): Promise<Buffer> {
        console.log("getting track", id);

        const foundTrack = await this.findTrack(id);
        console.log("found track", foundTrack);

        return await this.readFile(foundTrack.path);
    }
}
