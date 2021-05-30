import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';

const SALT_WORK_FACTOR = 10;

@Schema()
export class User extends Document {

  // @Prop({ required: true, unique: true })
  // _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  name?: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  favouriteTracks: string[]

  // isCorrectPassword?: Function;
}

const UserSchema = SchemaFactory.createForClass(User);

export const UserSchemaProvider = {
  name: User.name,
  useFactory: () => {
    const schema = UserSchema;

    // schema.pre<User>('save', function (next) {
      // if (!user.isModified('password')) return next();

      // if (this.password) {
      //   bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
      //     if (err) return next(err);
      //     bcrypt.hash(this.password, salt, (err, hash) => {
      //       if (err) return next(err);

      //       this.password = hash;
      //       next();
      //     });
      //   });
      // }
    // });

    // schema.methods.isCorrectPassword = async function (password: string): Promise<boolean> {
    //   return bcrypt.compare(password, this.password);
    // };

    return schema;
  },
  collection: 'usersCollection',
};
