import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserCollectionService } from 'src/collections/user-collection/user-collection.service';
import { UserDto } from 'src/model/user.dto';

@Injectable()
export class AuthService {

    constructor(private readonly userCollectionService: UserCollectionService, private jwtService: JwtService) { }

    async signIn(user: UserDto): Promise<any> {
        const foundUser = await this.userCollectionService.findByEmail({ email: user.email });
        if (!foundUser) {
            // throw new ConflictException("");
        }

        if(foundUser.name !== user.name) {
            // throw new ConflictException("Incorrect name or password");
        }

        const isCorrectPassword = await foundUser.isCorrectPassword(user.password);

        if(!isCorrectPassword) {
            // throw new ConflictException("Incorrect name or password");
        }

        const payload = {
            username: foundUser.name,
            sub: foundUser._id,
        };

        const foundUserCopy = {
            name: foundUser.name,
            email: foundUser.email,
        }

        return {
            user: foundUserCopy,
            token: this.jwtService.sign(payload),
        };
    }

    async signUp(newUser: UserDto): Promise<any> {
        const isUserExist = await this.userCollectionService.findByEmail({ email: newUser.email });
        if (isUserExist) {
            throw new ConflictException("Email already exist");
        }

        try {
            const createdUser = (await this.userCollectionService.create(newUser)).toObject();

            const createdUserCopy = {
                name: createdUser.name,
                email: createdUser.email,
            }

            const payload = {
                username: createdUser.name,
                sub: createdUser._id,
            };

            return {
                user: createdUserCopy,
                token: this.jwtService.sign(payload),
            };
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

}
