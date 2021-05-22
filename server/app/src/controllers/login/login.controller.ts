import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from 'src/model/user.dto';
import { AuthService } from 'src/services/auth/auth.service';

@Controller('login')
export class LoginController {

    constructor(private readonly authService: AuthService) {

    }

    @Post()
    async create(@Body() user: UserDto): Promise<void> {
        console.log("login user", user);

        return await this.authService.signIn(user);
    }
    
}
