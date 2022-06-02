import { LandmarkCityDTO } from './landmark-city.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, IsNumber, MinLength, IsNotEmpty, Min, IsBoolean, IsUrl } from 'class-validator';

export class LandmarkCreateUpdateDTO {
    @ApiProperty({description: 'Internationally recognized Landmark name', minimum: 3, maximum: 20})
    @IsNotEmpty({message: '\'$property\' field is required.'})
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    name: string;

    @ApiProperty({description: 'Landmark \'pretty-url\' slug (Unique)', minimum: 3})
    @IsNotEmpty({message: '\'$property\' field is required.'})
    @IsString()
    @MinLength(3)
    slug: string;

    @ApiProperty({description: 'Short introductory text of the Landmark (Sub-title)', maximum: 50})
    @IsNotEmpty({message: '\'$property\' field is required.'})
    @IsString()
    @MaxLength(50)
    introText: string;

    @ApiPropertyOptional({description: 'A longer descriptive text used on Landmark page'})
    @IsOptional()
    @IsString()
    description: string;

    @ApiPropertyOptional({description: 'Entrance fee for the Landmark (null-unknown; 0-free)'})
    @IsOptional()
    @IsNumber()
    @Min(0)
    entranceFee: number;

    @ApiPropertyOptional({description: 'URL to the official website of the Landmark'})
    @IsOptional()
    @IsUrl()
    officialWebsite: string;

    @ApiPropertyOptional({description: 'Featured image of the Landmark'})
    @IsOptional()
    @IsString()
    featuredImage: string;

    @ApiPropertyOptional({description: 'A short descriptive text on how to get to the landmark'})
    @IsOptional()
    @IsString()
    howToArrive: string;

    @ApiPropertyOptional({description: 'A short descriptive text of working/non-working days'})
    @IsOptional()
    @IsString()
    workingDays: string;

    @ApiPropertyOptional({description: 'A short descriptive text of working/non-working hours'})
    @IsOptional()
    @IsString()
    workingHours: string;

    @ApiPropertyOptional({description: 'Coordinates pointing to the center of the landmark (i.e. 41.9061871712875, 12.475461122446518)'})
    @IsOptional()
    @IsString()
    coordinates: string;

    @ApiPropertyOptional({description: 'Nested City object, containing necessary parent city data for quick access', type: LandmarkCityDTO})
    @IsOptional()
    city: LandmarkCityDTO;

    @ApiProperty({description: 'Flag determining whether Landmark is available to the Public or not'})
    @IsNotEmpty({message: '\'$property\' field is required.'})
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