import { BadRequestException, Body, ConflictException, Controller, InternalServerErrorException, Post } from '@nestjs/common';
import { UserCollectionService } from 'src/collections/user-collection/user-collection.service';
import { UserDto } from 'src/model/user.dto';

@Controller('register')
export class RegisterController {

    constructor(private readonly authService: UserCollectionService) {

    }

    @Post()
    async create(@Body() newUser: UserDto): Promise<void> {
        console.log("new User", newUser);

        const isUserExist = await this.authService.findByEmail({ email: newUser.email });
        if (isUserExist) {
            throw new ConflictException("Email already exist");
        }

        this.authService.create(newUser)
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                throw new InternalServerErrorException(error.message);
            });
    }

}
