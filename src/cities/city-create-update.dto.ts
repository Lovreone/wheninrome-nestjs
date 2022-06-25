import { IsNotEmpty, IsString, MinLength, MaxLength, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CityCreateUpdateDTO {
    @ApiProperty({description: 'Internationally recognized city name (English)', minimum: 3, maximum: 20})
    @IsNotEmpty({message: '\'$property\' field is required.'})
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    name: string;

    @ApiProperty({description: 'City \'pretty-url\' slug (Unique)', minimum: 3})
    @IsNotEmpty({message: '\'$property\' field is required.'})
    @IsString()
    @MinLength(3)
    slug: string;

    @ApiProperty({description: 'Parent Country of the City', minimum: 3})
    @IsNotEmpty({message: '\'$property\' field is required.'})
    @IsString()
    @MinLength(3)
    country: string;

    @ApiPropertyOptional({description: 'Featured image of the City'})
    @IsOptional()
    @IsString()
    featuredImage: string;

    @ApiProperty({description: 'Short introductory text of the city (Sub-title)', maximum: 50})
    @IsNotEmpty({message: '\'$property\' field is required.'})
    @IsString()
    @MaxLength(50)
    introText: string;

    @ApiPropertyOptional({description: 'Local currency used in the city (i.e. EUR, USD, ...)'})
    @IsOptional()
    @IsString()
    localCurrency: string;

    @ApiPropertyOptional({description: 'A longer descriptive text used on City page'})
    @IsOptional()
    @IsString()
    description: string;

    @ApiProperty({description: 'Flag determining whether City is available to the Public or not'})
    @IsNotEmpty({message: '\'$property\' field is required.'})
    @IsBoolean()
    isActive: boolean;

    createdAt: Date;
    modifiedAt: Date;
}
