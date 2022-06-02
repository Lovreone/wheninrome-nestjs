import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LandmarkCityDTO {
    @ApiProperty({description: 'City item ID (Unique)'})
    @IsString()
    public id: string;

    @ApiProperty({description: 'Internationally recognized city name (English)'})
    @IsString()
    public name: string;

    @ApiProperty({description: 'City \'pretty-url\' slug (Unique)'})
    public slug: string;

    @ApiProperty({description: 'Flag determining whether City is available to the Public or not'})
    public isActive: boolean;
}
