import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, MaxLength, IsEmail, IsBoolean } from 'class-validator';
import { Role } from 'src/helpers/enums';

// FIXME: Rethink what we allow to be changed by admin and what for user
export class UserUpdateDTO {
    @ApiProperty({description: 'User designated username (Unique)', minimum: 2, maximum: 20})
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    username: string;

    @ApiProperty({description: 'User designated email (Unique)'})
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({description: 'First name of the User', minimum: 2, maximum: 20})
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    firstName: string;

    @ApiProperty({description: 'Last name of the User', minimum: 2, maximum: 20})
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    lastName: string;

    @ApiProperty({description: 'Flag determining whether user account is active or not'})
    @IsBoolean()
    isActive: boolean;

    createdAt?: Date;
    modifiedAt?: Date;
    roles: Role[];
}
