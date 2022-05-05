import { UserConverter } from './user.converter';
import { UserCreateDTO } from './user-create.dto';
import { Controller, Post, HttpCode, Body } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { UsersService } from './users.service';

import { UserDTO } from './user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService
    ) {}

    @Post()
    @HttpCode(201)
    @ApiResponse({
        status: 201,
        type: UserDTO,
        description: 'Returned the created User document'
    })
    @ApiBody({
        type: UserCreateDTO
    })
    async registerNewUser(
        @Body() body: UserCreateDTO

    ): Promise<UserDTO> {
        const validatedBody = await this.usersService.validateCreateBodyData(body);
        const newUser = await this.usersService.insert(validatedBody);
        return UserConverter.convertToDto(newUser);
    }
}
