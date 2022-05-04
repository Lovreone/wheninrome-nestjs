import { Role } from 'src/helpers/enums';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserDTO {
    @ApiProperty()
    public id: string;

    @ApiProperty()
    public username: string;

    @ApiProperty()
    public email: string;

    @ApiProperty()
    public firstName: string;

    @ApiProperty()
    public lastName: string;

    @ApiProperty()
    public isActive: boolean;

    @ApiPropertyOptional()
    public createdAt: Date;

    @ApiPropertyOptional()
    public modifiedAt: Date;

    @ApiProperty()
    public roles: Role[];

    constructor(
        id: string,
        username: string,
        email: string,
        firstName: string,
        lastName: string,
        isActive: boolean,
        createdAt: Date,
        modifiedAt: Date,
        roles: Role[],
    ) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.isActive = isActive;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
        this.roles = roles;
    }
}
