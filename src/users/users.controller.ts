import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { UserConverter } from './user.converter';
import { Controller, Request, HttpCode, Body, Get, Delete, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { UsersService } from './users.service';

import { UserDTO } from './user.dto';

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService
    ) {}

    /* Get user profile (User) 
        TODO: Remove from Auth (AppControler), use from here
    */
    @ApiTags('Users (User)')
    @UseGuards(JwtAuthGuard)
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
    @ApiResponse({
        status: 200,
        type: [UserDTO],
        description: 'Returns the full list of User documents'
    })
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
    @ApiResponse({
        status: 204,
        description: 'Deletes User document by ID'
    })
    @HttpCode(204)
    @Delete(':id')
    async delete(
        @Param('id') userId: string
    ): Promise<void> {
        await this.usersService.delete(userId);
    }
}
