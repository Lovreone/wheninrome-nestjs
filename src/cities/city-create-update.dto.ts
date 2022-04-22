import { IsNotEmpty, IsString, MinLength, MaxLength, IsOptional, IsBoolean } from 'class-validator';
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
    featuredImage: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    introText: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    localCurrency: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    description: string;

    @ApiProperty()
    @IsBoolean()
    isActive: boolean;

    createdAt: Date;
    modifiedAt: Date;
}
// TODO: Make sure all constraints reflect the create/edit form in FE
