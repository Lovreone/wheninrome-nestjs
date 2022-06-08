import { Role } from 'src/helpers/enums';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserDTO {
    @ApiProperty({description: 'User item ID (Unique)'})
    public id: string;

    @ApiProperty({description: 'User designated username (Unique)', minimum: 2, maximum: 20})
    public username: string;

    @ApiProperty({description: 'User designated email (Unique)'})
    public email: string;

    @ApiProperty({description: 'First name of the User', minimum: 2, maximum: 20})
    public firstName: string;

    @ApiProperty({description: 'Last name of the User', minimum: 2, maximum: 20})
    public lastName: string;

    @ApiProperty({description: 'Flag determining whether User account is active or not'})
    public isActive: boolean;

    @ApiPropertyOptional({description: 'Date of User profile creation'})
    public createdAt: Date;

    @ApiPropertyOptional({description: 'Date of latest User profile update'})
    public modifiedAt: Date;

    @ApiProperty({
        description: 'Permission level of the User', 
        type: 'array', 
        items: { type: 'string', enum: ['ROLE_USER','PONTIFEX_MAXIMVS']}
    })    
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
