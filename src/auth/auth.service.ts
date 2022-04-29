import { Injectable } from '@nestjs/common';
import { UsersService } from './../users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}
    
    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    /* FIXME:  in a real application, you wouldn't store a password in plain text. 
        You'd instead use a library like bcrypt, with a salted one-way hash algorithm. 
        With that approach, you'd only store hashed passwords, 
        and then compare the stored password to a hashed version of the incoming password, 
        thus never storing or exposing user passwords in plain text. 
        To keep our sample app simple, we violate that absolute mandate and use plain text. 
        Don't do this in your real app!
    */

}
