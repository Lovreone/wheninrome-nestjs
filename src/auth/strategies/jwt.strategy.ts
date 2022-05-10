import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { jwtConstants } from '../constants';

// TODO: Cleanup comments when finished
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    /* Config opts available https://github.com/mikenicholson/passport-jwt#configure-strategy */
    super({
      /* jwtFromRequest: supplies the method by which the JWT will be extracted from the Request. 
      We use the standard approach of supplying a bearer token in the Authorization header of our API requests. 
      Other options are described here: https://github.com/mikenicholson/passport-jwt#extracting-the-jwt-from-the-request */
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      /* ignoreExpiration: We choose the default false setting, delegating check of JWT expiration to Passport module.
      If our route is supplied with an expired JWT, request will be denied with 401 Unauthorized response. */
      ignoreExpiration: false,
      /* secretOrKey: we are using the expedient option of supplying a symmetric secret 
      for signing the token. Do not expose this secret publicly. */
      secretOrKey: jwtConstants.secret,
    });
  }

  /* Passport builds user object based on validate() method return value, and attaches it as a property on the Request object.
  This approach leaves us room to inject other business logic into the process, like doing a database lookup in validate() 
  to extract more user info, returning a more enriched user.

  This is also where we could do further token validation, like looking up userId in a list of revoked tokens, enabling us to 
  perform token revocation. The model implemented here is a fast, "stateless JWT" model, where each API call is immediately authorized 
  based on valid JWT presence, and a small bit of info about the requester (its userId and username) is available in our Request pipeline. */
  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
