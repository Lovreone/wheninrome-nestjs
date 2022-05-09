import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

// TODO: Clean up all comments when finished
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ 
      usernameField: 'email',
      passwordField: 'password'
    });
    /* https://docs.nestjs.com/security/authentication
    Vanilla Passport
    [1] A set of options that are specific to that strategy. 
    For example, in a JWT strategy, 
    you might provide a secret to sign tokens.

    With @nestjs/passport, you configure a Passport strategy 
    by extending the PassportStrategy class. 
    You pass the strategy options [1] 
    by calling the super() method in your subclass, 
    optionally passing in an options object.
    
    TODO: 
    We can pass an options object in the call to super() 
    to customize the behavior of the passport strategy. 
    In this example, the passport-local strategy by default 
    expects properties called username and password in the request body. 
    Pass an options object to specify different property names, 
    for example: super({ usernameField: 'email' })

    Check strategy configuration options available 
        http://www.passportjs.org/concepts/authentication/strategies/
        https://www.passportjs.org/packages/
        https://github.com/jaredhanson/passport-local*/
  }

  /* Vanilla Passport
  [2] A "verify callback", which is where you tell Passport how to 
  interact with your user store (where you manage user accounts). 
  Here, you verify whether a user exists (and/or create a new user), 
  and whether their credentials are valid. T
  he Passport library expects this callback to return a full user 
  if the validation succeeds, or a null if it fails 
  (failure is defined as either the user is not found, or, 
    in the case of passport-local, the password does not match).

  With @nestjs/passport You provide the verify callback [2] 
  by implementing a validate() method in your subclass.
  
  For each strategy, Passport will call the verify function 
  (implemented with the validate() method in @nestjs/passport) 
  using an appropriate strategy-specific set of parameters. 
  For the local-strategy, Passport expects a validate() method
   with the following signature: 
   validate(username: string, password:string): any.
  */
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}