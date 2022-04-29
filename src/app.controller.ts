import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { Controller, Request, UseGuards, Post } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService
  ) {}

  @UseGuards(LocalAuthGuard) // The route handler will only be invoked if the user has been validated
  @Post('auth/login')
  async login(@Request() req) {
    /* The req parameter will contain a user property (populated by 
      Passport during the passport-local authentication flow) */
    return this.authService.login(req.user);
  }
}
