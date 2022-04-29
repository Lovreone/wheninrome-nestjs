import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { jwtConstants } from './constants';

// TODO: Cleanup comments when finished
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    /* Configuration options available
       https://github.com/mikenicholson/passport-jwt#configure-strategy */
    super({
      /* jwtFromRequest: supplies the method by which the JWT will be extracted from 
      the Request. We will use the standard approach of supplying a bearer token in 
      the Authorization header of our API requests. Other options are described here: 
      https://github.com/mikenicholson/passport-jwt#extracting-the-jwt-from-the-request */
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      /* ignoreExpiration: just to be explicit, we choose the default false setting, 
      which delegates the responsibility of ensuring that a JWT has not expired to 
      the Passport module. This means that if our route is supplied with an expired JWT, 
      the request will be denied and a 401 Unauthorized response sent. 
      Passport conveniently handles this automatically for us. */
      ignoreExpiration: false,
      /* secretOrKey: we are using the expedient option of supplying a symmetric secret 
      for signing the token. Other options, such as a PEM-encoded public key, 
      may be more appropriate for production apps (see here for more information):
      https://github.com/mikenicholson/passport-jwt#configure-strategy
      In any case, as cautioned earlier, do not expose this secret publicly. */
      secretOrKey: jwtConstants.secret,
    });
  }

  /* Recall again that Passport will build a user object based on the return value 
  of our validate() method, and attach it as a property on the Request object.
    It's also worth pointing out that this approach leaves us room ('hooks' as it were) 
    to inject other business logic into the process. 
    For example, we could do a database lookup in our validate() 
    method to extract more information about the user, resulting in a more enriched user
     object being available in our Request. This is also the place we may decide to do 
     further token validation, such as looking up the userId in a list of revoked tokens, 
     enabling us to perform token revocation. The model we've implemented here in our sample
     code is a fast, "stateless JWT" model, where each API call is immediately authorized
      based on the presence of a valid JWT, and a small bit of information about the requester 
      (its userId and username) is available in our Request pipeline. */
  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
