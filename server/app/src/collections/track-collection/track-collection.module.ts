import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
    Track,
    TrackSchema,
} from './track.schema';
import { TrackCollectionService } from "./track-collection.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Track.name,
        schema: TrackSchema,
        collection: 'tracksCollection',
      },
    ]),
  ],
  providers: [TrackCollectionService],
  exports: [TrackCollectionService],
})
export class TrackCollectionModule {}
