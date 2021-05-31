import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { TrackDto } from 'src/model/track.dto';
import {
    Track,
} from './track.schema';

@Injectable()
export class TrackCollectionService {
    constructor(
        @InjectModel(Track.name)
        private trackModel: Model<Track>,
        @InjectConnection() private connection: Connection
    ) {
        // console.log(this.connection);
    }

    // async create(createCatDto: TrackDto): Promise<Track> {
    //     const createdTrack = new this.trackModel(createCatDto);
    //     return createdTrack.save();
    // }

    async findAllTracks(): Promise<Track[]> {
        return await this.trackModel.find({}, "-_id").exec();
    }
}
