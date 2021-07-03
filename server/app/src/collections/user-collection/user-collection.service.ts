import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/model/user.dto';
import {
    User,
} from './user.schema';

@Injectable()
export class UserCollectionService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
    ) { }

    async create(createUserDto: UserDto): Promise<User> {
        const createdUser = new this.userModel(createUserDto);
        return await createdUser.save();
    }

    async findByEmail({ email }, exclude = {}): Promise<User> {
        return await this.userModel.findOne({ email }, exclude).exec();
    }

    async addFavourite({ email, trackId }): Promise<{ favouriteTracks: string[] }> {
        const { favouriteTracks } = await this.userModel.findOneAndUpdate(
            { email },
            { $addToSet: { favouriteTracks: trackId } },
            { new: true },
        ).exec();
        console.log('document after updating =>', favouriteTracks);
        return { favouriteTracks };
    }

    async deleteFavourite({ email, trackId }): Promise<{ favouriteTracks: string[] }> {
        const { favouriteTracks } = await this.userModel.findOneAndUpdate(
            { email },
            { $pull: { favouriteTracks: trackId } },
            { new: true },
        ).exec();
        console.log('document after updating =>', favouriteTracks);
        return { favouriteTracks };
    }

    async addPlaylistId({ email, playlistId }): Promise<{ playlistIds: string[] }> {
        const { playlistIds } = await this.userModel.findOneAndUpdate(
            { email },
            { $addToSet: { playlistIds: playlistId } },
            { new: true },
        ).exec();
        console.log('document after updating =>', playlistIds);
        return { playlistIds };
    }

}
