import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LandmarkCityDTO {
    @ApiProperty()
    @IsString()
    public id: string;

    @ApiProperty()
    @IsString()
    public name: string;
}
