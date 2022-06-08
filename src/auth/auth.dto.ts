import { ApiProperty } from '@nestjs/swagger';
import { UserDTO } from './../users/user.dto';
import { Role } from '../helpers/enums';

/** All classes within auth.dto.ts are used specifically for Swagger 
 *  documentation (ApiBody/ApiResponse decorators).
 *  Actual login field validation is being done in local.strategy.ts */
export class LoginBodyDTO {
    @ApiProperty({description: 'User designated email'})
    email: string;

    @ApiProperty({description: 'User designated password'})
    password: string;
}

export class LoginResponseDTO {
    @ApiProperty({description: 'Generated JWT access token'})
    access_token: string;

    @ApiProperty({description: 'Token expiry date expressed in milliseconds (NumericDate)'})
    tokenExpiresAt: number;

    @ApiProperty({description: 'Token issue date expressed in milliseconds (NumericDate)'})
    tokenIssuedAt: number;

    @ApiProperty()
    user: UserDTO;
}

export class ProfileResponseDTO {
    @ApiProperty({description: 'Unique User ID'})
    userId: string;

    @ApiProperty({description: 'Unique User email address'})
    email: string;

    @ApiProperty({
        description: 'Access Roles assigned to the User', 
        type: 'array', 
        items: { type: 'string', enum: ['ROLE_USER','PONTIFEX_MAXIMVS']}
    })    
    roles: Role[];

    @ApiProperty({description: 'First name of the User'})
    firstName: string;

    @ApiProperty({description: 'Last name of the User'})
    lastName: string;
}
