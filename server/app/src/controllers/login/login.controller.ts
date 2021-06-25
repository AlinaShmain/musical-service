import { Body, Controller, Get, Param, Post, Session } from '@nestjs/common';
import { EncryptedData } from 'src/model/encryptedData.dto';
import { AuthService } from 'src/services/auth/auth.service';
import * as secureSession from 'fastify-secure-session';
import { AuthInfoDto } from 'src/model/authInfo.dto';

@Controller('login')
export class LoginController {

    constructor(private readonly authService: AuthService) {

    }

    @Get("/:email")
    async findUser(@Param("email") email: string): Promise<EncryptedData> {
        console.log("login user email", email);

        return await this.authService.validateUser(email);
    }

    @Post()
    async create(@Body() { hashRND }): Promise<AuthInfoDto> {
        console.log("hashRND", hashRND);
        const splitted = hashRND.split(":")
        const hashData = {
            salt: splitted[0],
            hashClient: splitted[1],
        };
        console.log("hashData", hashData)
        return await this.authService.signIn(hashData);
    }

}
