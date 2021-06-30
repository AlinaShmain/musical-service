import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Artist } from '../artist-collection/artist.schema';

@Injectable()
export class ArtistCollectionService {
    constructor(
        @InjectModel(Artist.name)
        private artistModel: Model<Artist>,
    ) { }

    async findAllArtists(): Promise<Artist[]> {
        return await this.artistModel.find({}, { _id: 0 }).exec();
    }

    async findById({ id }): Promise<Artist> {
        return await this.artistModel.findOne({ id }, { _id: 0 }).exec();
    }

}

