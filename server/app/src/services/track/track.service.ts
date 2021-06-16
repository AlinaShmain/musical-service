import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { resolve } from 'path';

@Injectable()
export class TrackService {

    readFile(id: string): Promise<Buffer> {
        // const filepath = resolve(__dirname, "../", "../", "./src", "./music-storage", "./track1.mp3");
        const filepath = resolve(__dirname, "../", "../", "../", "./src", "./music-storage", "./track1.mp3");
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

    // toArrayBuffer(buf: Buffer): ArrayBuffer {
    //     const ab = new ArrayBuffer(buf.length);
    //     const view = new Uint8Array(ab);
    //     for (let i = 0; i < buf.length; ++i) {
    //         view[i] = buf[i];
    //     }
    //     return ab;
    // }

    async getTrack(id: string): Promise<Buffer> {
        console.log("getting track", id);

        // const audioData = await this.readFile(id)

        // return this.toArrayBuffer(audioData);

        return await this.readFile(id);
    }
}
