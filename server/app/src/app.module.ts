import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrackController } from './track/track.controller';
import { TrackService } from './track/track.service';
import { TracksController } from './tracks/tracks.controller';
import { TracksService } from './tracks/tracks.service';

@Module({
  imports: [],
  controllers: [AppController, TracksController, TrackController],
  providers: [AppService, TracksService, TrackService],
})
export class AppModule {}
