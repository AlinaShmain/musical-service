import { JwtModule } from "@nestjs/jwt";
import { Module } from '@nestjs/common';
import { UserCollectionModule } from "src/collections/user-collection/user-collection.module";
import { AuthService } from "./auth.service";
import { jwtConstants } from "./constants";
import { RegisterController } from "src/controllers/register/register.controller";
import { LoginController } from "src/controllers/login/login.controller";
import { UserInfoController } from "src/controllers/user-info/user-info.controller";


@Module({
    imports: [
        UserCollectionModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '3h' },
        }),
    ],
    controllers: [RegisterController, LoginController, UserInfoController],
    providers: [AuthService],
    exports: [AuthService, JwtModule, UserCollectionModule],
})
export class AuthModule { }