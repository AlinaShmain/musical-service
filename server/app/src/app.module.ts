import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrackCollectionModule } from './collections/track-collection/track-collection.module';
import { TrackController } from './controllers/track/track.controller';
import { TrackService } from './services/track/track.service';
import { TracksController } from './controllers/tracks/tracks.controller';
import { AuthModule } from './services/auth/auth.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { UserInfoController } from './controllers/user-info/user-info.controller';
import { FavouritesController } from './controllers/favourites/favourites.controller';
import { FavouritesService } from './services/favourites/favourites.service';
import { ArtistCollectionModule } from './collections/artist-collection/artist-collection.module';
import { ArtistsController } from './controllers/artists/artists.controller';
import { ArtistController } from './controllers/artist/artist.controller';
import { TracksService } from './services/tracks/tracks/tracks.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://alinau:admin@cluster0.lk3bb.mongodb.net/musicServiceDB?retryWrites=true&w=majority',
      { useFindAndModify: false }
    ),
    TrackCollectionModule,
    ArtistCollectionModule,
    AuthModule,
  ],
  controllers: [AppController, TracksController, TrackController, FavouritesController, ArtistsController, ArtistController],
  providers: [AppService, TrackService, FavouritesService, TracksService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(UserInfoController, FavouritesController);
  }
}
