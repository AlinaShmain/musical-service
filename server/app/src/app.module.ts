import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrackCollectionModule } from './collections/track-collection/track-collection.module';
import { TrackController } from './controllers/track/track.controller';
import { TrackService } from './services/track/track.service';
import { TracksController } from './controllers/tracks/tracks.controller';
import { AuthModule } from './services/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://alinau:admin@cluster0.lk3bb.mongodb.net/musicServiceDB?retryWrites=true&w=majority'
    ),
    TrackCollectionModule, 
    // UserCollectionModule,
    AuthModule,
  ],
  controllers: [AppController, TracksController, TrackController],
  providers: [AppService, TrackService],
})
export class AppModule { }
