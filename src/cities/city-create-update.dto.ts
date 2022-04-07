import { LandmarkDTO } from './../landmarks/landmark.dto';
import { IsNotEmpty, IsString, MinLength, MaxLength, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CityCreateUpdateDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    slug: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @MinLength(3)
    country: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    image: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    description: string;

    @ApiPropertyOptional()
    @IsOptional()
    landmarks: Array<LandmarkDTO>
}
// TODO: Make sure all constraints reflect the create/edit form in FE
