import { Controller, Request, UseGuards, Post, Get, Body, HttpCode } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { Roles } from './auth/decorators/roles.decorator';
import { Role } from 'src/helpers/enums';
import { UsersService } from './users/users.service';
import { UserConverter } from './users/user.converter';
import { UserDTO } from './users/user.dto';
import { UserCreateDTO } from './users/user-create.dto';
import { UserLoginDTO } from './users/user-login.dto';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  @ApiTags('Authentification')
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

  @ApiTags('Authentification')
  @ApiBody({
    type: UserLoginDTO
  })
  @ApiResponse({
    status: 201,
    description: `Returns JWT access token, Token expiry and logged-in User object. Response object structure:\n
      { 
        access_token: string,
        tokenExpiresAt: NumericDate,
        tokenIssuedAt: NumericDate,
        user: UserDTO
      }
    `
  })
  @UseGuards(LocalAuthGuard) // The route handler will only be invoked if the user has been validated
  @Post('auth/login')
  async login(@Request() req) {
    /* The req parameter will contain a user property (populated by 
      Passport during the passport-local authentication flow) */
    return this.authService.login(req.user);
  }

  /** When this route is hit, the Guard will automatically 
  invoke our passport-jwt custom configured logic, validating the JWT, 
  and assigning the user property (can be enriched in jwt.strategy.ts) 
  to the Request object. */ 
  @ApiTags('Authentification')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: `Requires a valid JWT in header. Returns basic user info and logged-in User roles. Response object structure:\n
      {
        "userId": string,
        "email": string,
        "roles": string[],
        "firstName": string,
        "lastName": string
      }
    `
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin)
  @Get('auth/me')
  getProfile(@Request() req) {
    return req.user;
  }
}
