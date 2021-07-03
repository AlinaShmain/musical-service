import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlaylistDto } from 'src/model/playlist.dto';
import { Playlist } from './playlist.schema';

@Injectable()
export class PlaylistCollectionService {
    constructor(
        @InjectModel(Playlist.name)
        private playlistModel: Model<Playlist>,
    ) { }

    async findAllPlaylists(): Promise<Playlist[]> {
        return await this.playlistModel.find({}, { _id: 0 }).exec();
    }

    async findByIds({ playlistIds }): Promise<Playlist[]> {
        return await this.playlistModel.find({ id: { $in: playlistIds } }, { _id: 0 }).exec();
    }

    async findById({ playlistId }): Promise<Playlist> {
        return await this.playlistModel.findOne({ id: playlistId }, { _id: 0 }).exec();
    }

    async addImagePlaylist({ playlistId, imagePath }): Promise<void> {
        this.playlistModel.findOneAndUpdate(
            { id: playlistId },
            { $addToSet: { imagesPath: imagePath } },
            { new: true },
        ).exec();
    }

    async addToPlaylist({ trackId, playlistId }): Promise<{ trackIds: string[] }> {
        const { trackIds } = await this.playlistModel.findOneAndUpdate(
            { id: playlistId },
            { $addToSet: { trackIds: trackId } },
            { new: true },
        ).exec();
        console.log('document after updating =>', trackIds);
        return { trackIds };
    }

    async createPlaylist(playlistInfo: PlaylistDto): Promise<Playlist> {
        const createdPlaylist = new this.playlistModel(playlistInfo);
        return await createdPlaylist.save();
    }

    async editPlaylist(playlistInfo: PlaylistDto): Promise<Playlist> {
        const playlist = await this.playlistModel.findOneAndUpdate(
            { id: playlistInfo.id },
            {
                title: playlistInfo.title,
                description: playlistInfo.description,
            },
            { new: true },
        ).exec();
        console.log('document after updating =>', playlist);
        return playlist;
    }

}

