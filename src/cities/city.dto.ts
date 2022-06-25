import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CityDTO {
    @ApiProperty({description: 'City item ID (Unique)'})
    public id: string;

    @ApiProperty({description: 'Internationally recognized city name (English)'})
    public name: string;

    @ApiProperty({description: 'City \'pretty-url\' slug (Unique)'})
    public slug: string;

    @ApiProperty({description: 'Parent Country of the City'})
    public country: string;

    @ApiPropertyOptional({description: 'Featured image of the City'})
    public featuredImage: string;

    @ApiProperty({description: 'Short introductory text of the city (Sub-title)'})
    public introText: string;

    @ApiPropertyOptional({description: 'Local currency used in the city (i.e. EUR, USD, ...)'})
    public localCurrency: string;

    @ApiPropertyOptional({description: 'A longer descriptive text used on City page'})
    public description: string;

    @ApiPropertyOptional({description: 'Flag determining whether City is available to the Public or not'})
    public isActive: boolean;

    @ApiPropertyOptional({description: 'Date of City item creation'})
    public createdAt: Date;

    @ApiPropertyOptional({description: 'Date of latest City item update'})
    public modifiedAt: Date;

    constructor(
        id: string, 
        name: string, 
        slug: string, 
        country: string, 
        featuredImage: string, 
        introText: string,
        localCurrency: string,
        description: string, 
        isActive: boolean,
        createdAt: Date,
        modifiedAt: Date,

    ) {
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.country = country;
        this.featuredImage = featuredImage;
        this.introText = introText;
        this.localCurrency= localCurrency;        
        this.description = description;
        this.isActive = isActive;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
    }
}
