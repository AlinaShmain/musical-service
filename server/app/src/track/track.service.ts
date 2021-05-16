import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { resolve } from 'path';

@Injectable()
export class TrackService {

    readFile(id: string): Promise<ArrayBuffer | Error> {
        const filepath = resolve(__dirname, "../", "../", "./src", "./music-storage", "./track1.mp3");
        console.log(filepath);

        return new Promise(function (resolve, reject) {
            fs.readFile(filepath, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    }

    getTrack(id: string): Promise<ArrayBuffer | Error> {
        return this.readFile(id);
    }
}
