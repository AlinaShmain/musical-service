import { Controller, Get, Param } from '@nestjs/common';
import { TokenDto } from 'src/model/token.dto';
import { AuthService } from 'src/services/auth/auth.service';

@Controller('verify')
export class VerifyController {
    
    constructor(private readonly authService: AuthService) {

    }

    @Get(":token")
    async verifyToken(@Param("token") token: string): Promise<TokenDto> {
        console.log("verify token", token);

        return await this.authService.verifyToken(token);
    }
}
