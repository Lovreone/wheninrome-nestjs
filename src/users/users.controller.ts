import { Controller, Request, HttpCode, Body, Get, Delete, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { RolesGuard } from './../auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

import { UsersService } from './users.service';
import { UserConverter } from './user.converter';
import { UserDTO } from './user.dto';
import { Role } from 'src/helpers/enums';

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService
    ) {}

    /* Get user profile (User) 
        TODO: Remove from Auth (AppControler), use from here
    */
    @ApiTags('Users (User)')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.User, Role.Admin)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

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

    /* TODO: Modify user{id} (Admin) 
        FirstName, lastName, 
        userName(uniquecheck,formatcheck), 
        email(uniquecheck,formatcheck)
        isActive
    */

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
