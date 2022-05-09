import { Injectable } from '@nestjs/common';
import { UsersService } from './../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { comparePasswords } from 'src/utils/bcrypt';
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
        const { password, ...result } = user;
        return result;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
            user: UserConverter.convertToDto({
                ...user._doc, 
                id: user._doc._id
            })
        }
    }
}
