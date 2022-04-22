import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CityDTO {
    @ApiProperty()
    public id: string;

    @ApiProperty()
    public name: string;

    @ApiProperty()
    public slug: string;

    @ApiPropertyOptional()
    public country: string;

    @ApiPropertyOptional()
    public featuredImage: string;

    @ApiPropertyOptional()
    public introText: string;

    @ApiPropertyOptional()
    public localCurrency: string

    @ApiPropertyOptional()
    public description: string;

    @ApiPropertyOptional()
    public isActive: boolean;

    @ApiPropertyOptional()
    public createdAt: Date;

    @ApiPropertyOptional()
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
