import { Controller, Request, UseGuards, Post, Get, Body, HttpCode } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { UsersService } from './users/users.service';
import { UserConverter } from './users/user.converter';
import { UserDTO } from './users/user.dto';
import { UserCreateDTO } from './users/user-create.dto';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  @ApiTags('Auth')
  @UseGuards(LocalAuthGuard) // The route handler will only be invoked if the user has been validated
  @Post('auth/login')
  async login(@Request() req) {
    /* The req parameter will contain a user property (populated by 
      Passport during the passport-local authentication flow) */
    return this.authService.login(req.user);
  }

  /* When our GET /profile route is hit, the Guard will automatically 
  invoke our passport-jwt custom configured logic, validating the JWT, 
  and assigning the user property to the Request object. */ 
  // TODO: Currently unused, using /users/profile instead. Remove later
  @ApiTags('Auth')
  @UseGuards(JwtAuthGuard)
  @Get('auth/me')
  getProfile(@Request() req) {
    return req.user;
  }

  @ApiTags('Auth')
  @ApiBody({
    type: UserCreateDTO
  })
  @ApiResponse({
    status: 201,
    type: UserDTO,
    description: 'Returned the created User document'
  })
  @HttpCode(201)
  @Post('auth/register')
  async registerNewUser(
      @Body() body: UserCreateDTO,
  ): Promise<UserDTO> {
      const validatedBody = await this.usersService.validateCreateBodyData(body);
      const newUser = await this.usersService.insert(validatedBody);
      return UserConverter.convertToDto(newUser);
  }
}
