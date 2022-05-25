import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, MaxLength, IsEmail } from 'class-validator';
import { Role } from 'src/helpers/enums';

export class UserCreateDTO {
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

    @ApiProperty({description: 'User designated password', minimum: 8})
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;

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

    isActive: boolean;
    roles: Role[];
    createdAt: Date;
    modifiedAt: Date;
}
