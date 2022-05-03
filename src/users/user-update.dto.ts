import { Role } from 'src/helpers/enums';

// FIXME: Rethink what we allow to be changed by admin and what for user
export class UserUpdateDTO {
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