import { Body, Controller, Post } from '@nestjs/common';
import { TokenDto } from 'src/model/token.dto';
import { UserDto } from 'src/model/user.dto';
import { AuthService } from 'src/services/auth/auth.service';

@Controller('register')
export class RegisterController {

    constructor(private readonly authService: AuthService) {

    }

    @Post()
    async create(@Body() newUser: UserDto): Promise<TokenDto> {
        console.log("new User", newUser);

        return await this.authService.signUp(newUser);
    }

}
