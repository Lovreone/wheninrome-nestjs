import { LandmarkCityDTO } from './landmark-city.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, IsNumber, MinLength, IsNotEmpty, Min, IsBoolean, IsUrl } from 'class-validator';

export class LandmarkCreateUpdateDTO {
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

    @ApiProperty()
    @IsString()
    introText: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    entranceFee: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsUrl()
    officialWebsite: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    featuredImage: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    howToArrive: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    workingDays: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    workingHours: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    coordinates: string;

    @ApiPropertyOptional({ type: LandmarkCityDTO })
    @IsOptional()
    city: LandmarkCityDTO;

    @ApiProperty()
    @IsBoolean()
    isActive: boolean;

    createdAt: Date;
    modifiedAt: Date;
}
// TODO: Make sure all constraints reflect the create/edit form in FE

/* TODO: Remove when finished 
Docs https://github.com/typestack/class-validator
 @IsString({always:false}) // Non mandatory field
 @IsLatitude()	Checks if the string or number is a valid latitude coordinate.
 @IsLongitude()	Checks if the string or number is a valid longitude coordinate.
 @IsLatLong()	Checks if the string is a valid latitude-longitude coordinate in the format lat, long.
 @IsOptional()	Checks if given value is empty (=== null, === undefined) and if so, ignores all the validators on the property.
*/