import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArtistCollectionService } from './artist-collection';
import { Artist, ArtistSchema } from './artist.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Artist.name,
        schema: ArtistSchema,
        collection: 'artistsCollection',
      },
    ]),
  ],
  providers: [ArtistCollectionService],
  exports: [ArtistCollectionService],
})
export class ArtistCollectionModule {}
