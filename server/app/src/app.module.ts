import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrackCollectionModule } from './collections/track-collection/track-collection.module';
import { TrackController } from './controllers/track/track.controller';
import { TrackService } from './track/track.service';
import { TracksController } from './controllers/tracks/tracks.controller';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://alinau:admin@cluster0.lk3bb.mongodb.net/musicServiceDB?retryWrites=true&w=majority'
    ),
    TrackCollectionModule],
  controllers: [AppController, TracksController, TrackController],
  providers: [AppService, TrackService],
})
export class AppModule { }
