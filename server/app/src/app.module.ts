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

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://alinau:admin@cluster0.lk3bb.mongodb.net/musicServiceDB?retryWrites=true&w=majority',
      { useFindAndModify: false }
    ),
    TrackCollectionModule,
    // UserCollectionModule,
    AuthModule,
  ],
  controllers: [AppController, TracksController, TrackController, FavouritesController],
  providers: [AppService, TrackService, FavouritesService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(UserInfoController, FavouritesController);
  }
}
