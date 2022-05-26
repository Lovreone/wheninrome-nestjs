import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './../auth.service';


// TODO: Clean up all comments when finished
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  
  /* Docs: https://docs.nestjs.com/security/authentication
  [1] Set of options specific to the strategy. 
  We configure a Passport strategy by extending the PassportStrategy class. 
  We pass the strategy options [1] by calling the super() in our subclass, optionally passing it an options object.
  Strategy configuration options available 
    http://www.passportjs.org/concepts/authentication/strategies/
    https://www.passportjs.org/packages/
    https://github.com/jaredhanson/passport-local */
  constructor(private authService: AuthService) {
    /** Overriding default local-strategy option (username) with 'email' */
    super({
      usernameField: 'email',
      passwordField: 'password'
    });
  }

  /* [2] A "verify callback", which is where you tell Passport how to interact with your user store (where you manage user accounts). 
  Here, you verify whether a user exists, and whether their credentials are valid. 
  Passport library expects this callback to return a full user if the validation succeeds, or a null if it fails  (user not found or password mismatch).
  
  For each strategy, Passport will call it's validate() method, using strategy-specific set of parameters. 
  For local-strategy, Passport expects method with signature: validate(username: string, password:string): any. */
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException(['Invalid login credentials!']);
    }
    return user;
  }
}