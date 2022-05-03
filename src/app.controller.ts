import { ApiTags } from '@nestjs/swagger';
import { Controller, Request, UseGuards, Post, Get } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService
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
  @ApiTags('Auth')
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
