import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from './../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

// TODO: JwtModule docs https://github.com/nestjs/jwt/blob/master/README.md
// TODO: Available config options https://github.com/auth0/node-jsonwebtoken#usage
@Module({
  imports: [
    UsersModule, 
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' }, // '60s'
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
