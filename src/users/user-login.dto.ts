import { ApiProperty } from '@nestjs/swagger';

/** Used specifically for Swagger ApiBody Decorator, 
 * actual validation is done in local.strategy.ts */
export class UserLoginDTO {
    @ApiProperty({description: 'User designated email'})
    email: string;

    @ApiProperty({description: 'User designated password'})
    password: string;
}
