import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { AuthService } from 'src/services/auth/auth.service';

@Controller('user-info')
export class UserInfoController {

    constructor(private readonly authService: AuthService) {

    }

    @Get()
    async create(@Body() { token }): Promise<void> {
        console.log("get userInfo", token);

        // return await this.authService.getUserInfo(token);
    }

}
