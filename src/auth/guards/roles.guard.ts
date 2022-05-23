import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from 'src/helpers/enums';

/* RolesGuard class will compare the roles assigned to the current user 
to the actual roles required by the current route being processed. */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    if (!user) {
      throw new UnauthorizedException(`Login required in order to gain access!`);
    }
  
    const isAuthorized = requiredRoles.some((role) => user.roles?.includes(role));
    if (!isAuthorized) {
      throw new UnauthorizedException('User doesn\'t have the required access permissions!');
    }

    return true;
  }
}
