import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { UserDto } from 'src/model/user.dto';
import {
    User,
} from './user.schema';

@Injectable()
export class UserCollectionService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
        @InjectConnection() private connection: Connection,
    ) {
        // console.log(this.connection);
    }

    async create(createUserDto: UserDto): Promise<User> {
        const createdUser = new this.userModel(createUserDto);
        return await createdUser.save();
    }

    async findByEmail({ email }): Promise<User> {
        return await this.userModel.findOne({ email }).exec();
    }

}
