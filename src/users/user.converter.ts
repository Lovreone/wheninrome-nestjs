import { UserDTO } from './user.dto';
import { User } from './user.model';

export class UserConverter {
    public static convertToDto(model: User): UserDTO {
        return new UserDTO(
            model.id || undefined,
            model.username || undefined,
            model.email || undefined,
            model.firstName || undefined,
            model.lastName || undefined,
            model.isActive,
            model.createdAt || undefined,
            model.modifiedAt || undefined,
            model.roles || []
        );
    }
}
