import { Controller, Request, HttpCode, Body, Get, Delete, Param, UseGuards, Patch } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { RolesGuard } from './../auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

import { UsersService } from './users.service';
import { UserConverter } from './user.converter';
import { UserDTO } from './user.dto';
import { UserUpdateDTO } from './user-update.dto';
import { Role } from 'src/helpers/enums';

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService
    ) {}

    /* TODO: Modify user profile data (User)
        FirstName, lastName, 
        userName(uniquecheck,formatcheck), 
        email(uniquecheck,formatcheck) ***Security ***SendingEmails
    */

    /* Change user password (User)
        TODO: TBD logic ***Security ***SendingEmails
    */    

    @ApiTags('Users (Admin)')
    @ApiBearerAuth()
    @ApiResponse({
        status: 200,
        type: [UserDTO],
        description: 'Returns the full list of User documents'
    })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Get()
    async getUsers(): Promise<UserDTO[]> {
        const users = await this.usersService.getAll();
        return users.map(user => UserConverter.convertToDto(user)); 
    }

    @ApiTags('Users (User)')
    @ApiBearerAuth()
    @ApiResponse({
        status: 200,
        type: UserDTO,
        description: 'Returned a single User document by ID'
    })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.User)
    @Get(':id')
    async getUserById(
        @Param('id') userId: string
    ): Promise<UserDTO> {
        const user = await this.usersService.getSingleById(userId);
        return UserConverter.convertToDto(user);
    }

    @ApiTags('Users (User)')
    @ApiBearerAuth()
    @ApiResponse({
        status: 200,
        type: UserDTO,
        description: 'Returned the updated User document'
    })
    @ApiBody({
        type: UserUpdateDTO
    })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.User)
    @Patch('profile/:id')
    async updateMyProfile(
        @Param('id') userId: string,
        @Body() body: UserUpdateDTO
    ): Promise<UserDTO> {
        const validatedBody = await this.usersService.validateUpdateBodyData(body);
        const updatedUser = await this.usersService.update(userId, validatedBody);
        return UserConverter.convertToDto(updatedUser);
    }

    @ApiTags('Users (Admin)')
    @ApiBearerAuth()
    @ApiResponse({
        status: 200,
        type: UserDTO,
        description: 'Returned the updated User document'
    })
    @ApiBody({
        type: UserUpdateDTO
    })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Patch(':id')
    async updateUserData(
        @Param('id') userId: string,
        @Body() body: UserUpdateDTO
    ): Promise<UserDTO> {
        const validatedBody = await this.usersService.validateUpdateBodyData(body);
        const updatedUser = await this.usersService.update(userId, validatedBody);
        return UserConverter.convertToDto(updatedUser);
    }

    /* FIXME: Not to be used in production  */
    @ApiTags('Users (Admin)')
    @ApiBearerAuth()
    @ApiResponse({
        status: 204,
        description: 'Deletes User document by ID'
    })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @HttpCode(204)
    @Delete(':id')
    async delete(
        @Param('id') userId: string
    ): Promise<void> {
        await this.usersService.delete(userId);
    }
}
