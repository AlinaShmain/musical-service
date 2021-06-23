import { JwtModule } from "@nestjs/jwt";
import { Module } from '@nestjs/common';
import { UserCollectionModule } from "src/collections/user-collection/user-collection.module";
import { AuthService } from "./auth.service";
import { jwtConstants } from "./constants";
import { RegisterController } from "src/controllers/register/register.controller";
import { LoginController } from "src/controllers/login/login.controller";
import { FavouritesController } from "src/controllers/favourites/favourites.controller";
import { FavouritesService } from "../favourites/favourites.service";
import { VerifyController } from "src/controllers/verify/verify.controller";
import { UserInfoController } from "src/controllers/user-info/user-info.controller";


@Module({
    imports: [
        UserCollectionModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '3h' },
        }),
    ],
    controllers: [RegisterController, LoginController, UserInfoController, VerifyController, FavouritesController],
    providers: [AuthService, FavouritesService],
    exports: [AuthService, FavouritesService, JwtModule],
})
export class AuthModule { }