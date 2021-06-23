import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserCollectionService } from 'src/collections/user-collection/user-collection.service';
import { UserDto } from 'src/model/user.dto';
import * as forge from "node-forge";
import { EncryptedData } from 'src/model/encryptedData.dto';
import * as bcrypt from "bcrypt";
import { TokenDto } from 'src/model/token.dto';

@Injectable()
export class AuthService {

    currentPayload = null;
    currentRND: number = null;

    constructor(private readonly userCollectionService: UserCollectionService, private jwtService: JwtService) { }

    getRandomInteger(min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER): number {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    encryptNum(num: number, publicKeyPem: string) {
        const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);

        // const encryptNum: string = publicKey.encrypt(num);
        // const encryptText: string = publicKey.encrypt(forge.util.encodeUtf8(num.toString()));
        console.log(forge.util.encodeUtf8(num.toString()));
        const encryptText: string = publicKey.encrypt(num.toString());

        // console.log("encryptNum", encryptNum);
        // console.log("encryptText", encryptText);

        return encryptText;
    }

    async verifyToken(token: string) {
        return this.jwtService.verify(token);
    }

    // getUserInfo() {

    // }

    async validateUser(email: string): Promise<EncryptedData> {
        const foundUser: UserDto = await this.userCollectionService.findByEmail({ email });
        if (!foundUser) {
            console.log("Incorrect email or password");
            throw new UnauthorizedException("Incorrect email or password");
        }

        // console.log("found user", foundUser);
        this.currentPayload = {
            email: foundUser.email,
            sub: foundUser._id,
        }

        const randInt: number = this.getRandomInteger();
        console.log("rand int", randInt);
        this.currentRND = randInt;

        const keys = foundUser.password.split("\r\n----\r\n");

        const encryptedRND = this.encryptNum(randInt, keys[1]);

        return {
            encryptedPrivateKey: keys[0],
            encryptedRND
        }
    }

    getHash(salt: string, str: string): string {
        const hash = bcrypt.hashSync(str, salt);

        return hash;
    }

    async signIn({salt, hashClient}): Promise<TokenDto> {
        const hashServer = this.getHash(salt, this.currentRND.toString());
        console.log("hash server", hashServer);
        console.log("hash client", hashClient);
        
        if (hashClient === hashServer) {
            const token = {
                token: this.jwtService.sign(this.currentPayload),
            };
            console.log("token", token);

            return token;
        }

        throw new UnauthorizedException("Incorrect email or password");

        // const isCorrectPassword = await foundUser.isCorrectPassword(user.password);

        // if(!isCorrectPassword) {
        //     // throw new ConflictException("Incorrect name or password");
        //     console.log("Incorrect email or password");
        // }

        // const payload = {
        //     emial: foundUser.email,
        //     sub: foundUser._id,
        // };

        // return {
        //     token: this.jwtService.sign(payload),
        // };
    }

    async signUp(newUser: UserDto): Promise<TokenDto> {
        const isUserExist = await this.userCollectionService.findByEmail({ email: newUser.email });
        if (isUserExist) {
            throw new ConflictException("Email already exist");
        }

        try {
            const createdUser = (await this.userCollectionService.create(newUser)).toObject();

            console.log("saved user", createdUser);

            const payload = {
                email: createdUser.email,
                sub: createdUser._id,
            };

            return {
                token: this.jwtService.sign(payload),
            };
        } catch (error) {
            console.log(error.message);
            throw new InternalServerErrorException(error.message);
        }
    }

}
