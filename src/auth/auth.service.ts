import { Injectable } from '@nestjs/common';
import { UsersService } from './../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}
    
    async validateUser(username: string, rawPass: string): Promise<any> {
        const user = await this.usersService.getSingleByUsername(username);
        if (!user) {
            return null;
        }

        const isMatchingPass = await this.comparePasswords(rawPass, user.password);
        if (!isMatchingPass) {
            return null;
        }
        const { password, ...result } = user;
        return result;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        }
    }

    private async comparePasswords(
        rawPass: string, 
        hashedPass: string
    ): Promise<boolean> {
        return await bcrypt.compare(rawPass, hashedPass)
    }
}
