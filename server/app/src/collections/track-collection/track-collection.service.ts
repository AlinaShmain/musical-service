import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
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

    // async create(track: TrackDto): Promise<Track> {
    //     const createdTrack = new this.trackModel(createCatDto);
    //     return createdTrack.save();
    // }

    async findAllTracks(): Promise<Track[]> {
        return await this.trackModel.find({}, { _id: 0, path: 0 }).exec();
    }

    async findById({ id }): Promise<Track> {
        return await this.trackModel.findOne({ id }).exec();
    }

    async findByIds({ trackIds }): Promise<Track[]> {
        return await this.trackModel.find({ id: { $in: trackIds } }, { _id: 0, path: 0 }).exec();
    }

}
