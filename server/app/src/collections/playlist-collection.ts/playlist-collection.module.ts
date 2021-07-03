import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlaylistCollectionService } from './playlist-collection';
import { Playlist, PlaylistSchema } from './playlist.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Playlist.name,
        schema: PlaylistSchema,
        collection: 'playlistsCollection',
      },
    ]),
  ],
  providers: [PlaylistCollectionService],
  exports: [PlaylistCollectionService],
})
export class PlaylistCollectionModule {}
