import { Role } from 'src/helpers/enums';

// FIXME: Rethink what we insert by user and what we generate
export class UserCreateDTO {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
    createdAt?: Date;
    modifiedAt?: Date;
    roles: Role[];
}