import { Injectable } from '@nestjs/common';
import { UsersService } from './../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { comparePasswords } from 'src/auth/utils/bcrypt';
import { UserConverter } from './../users/user.converter';

@Injectable()
export class AuthService {
    
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}
    
    async validateUser(email: string, rawPass: string): Promise<any> {
        const user = await this.usersService.getSingleByEmail(email);
        if (!user) {
            return null;
        }
        const isMatchingPass = await comparePasswords(rawPass, user.password);
        if (!isMatchingPass) {
            return null;
        }
        return user;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id, roles: user.roles };
        const accessToken =  this.jwtService.sign(payload);
        const decodedToken = this.jwtService.decode(accessToken);
        return {
            access_token: accessToken,
            tokenIssuedAt: decodedToken['iat'],
            tokenExpiresAt: decodedToken['exp'],
            user: UserConverter.convertToDto(user)
        }
    }
}
