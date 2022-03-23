import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, IsNumber, IsPositive } from 'class-validator';

export class LandmarkCreateUpdateDTO {
    @ApiProperty()
    @IsString()
    @MaxLength(20)
    name: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    description: string;

    @ApiProperty()
    @IsNumber()
    @IsPositive()
    entranceFee: number;
}

/* TODO: Remove when finished 
Docs https://github.com/typestack/class-validator
 @IsString({always:false}) // Non mandatory field
 @IsLatitude()	Checks if the string or number is a valid latitude coordinate.
 @IsLongitude()	Checks if the string or number is a valid longitude coordinate.
 @IsLatLong()	Checks if the string is a valid latitude-longitude coordinate in the format lat, long.
 @IsOptional()	Checks if given value is empty (=== null, === undefined) and if so, ignores all the validators on the property.
*/