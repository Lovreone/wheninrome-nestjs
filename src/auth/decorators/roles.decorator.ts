import { SetMetadata } from '@nestjs/common';
import { Role } from '../../helpers/enums';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
// Docs https://docs.nestjs.com/security/authorization
// We can use it to decorate any route handler in our controller. @Roles(Role.Admin)
