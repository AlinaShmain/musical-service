import { Body, Controller, Get } from '@nestjs/common';
import { UserDto } from 'src/model/user.dto';
import { AuthService } from 'src/services/auth/auth.service';

@Controller('user-info')
export class UserInfoController {

    constructor(private readonly authService: AuthService) {

    }

    @Get()
    async create(@Body() { token, decoded }): Promise<UserDto> {
        console.log("get userInfo", decoded);

        return await this.authService.getUserInfo(decoded.email);
    }

}
