import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserSchemaProvider,
} from './user.schema';
import { UserCollectionService } from "./user-collection.service";

@Module({
  imports: [
    MongooseModule.forFeatureAsync(
      [
        UserSchemaProvider
      ]
      // [
      //   {
      //     name: User.name,
      //     schema: UserSchema,
      //     collection: 'usersCollection',
      //   },
      // ]
    ),
  ],
  providers: [UserCollectionService],
  exports: [UserCollectionService],
})
export class UserCollectionModule { }
