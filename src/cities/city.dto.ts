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
    public image: string;

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
        image: string, 
        description: string, 
        createdAt: Date,
        modifiedAt: Date,
        isActive: boolean
    ) {
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.country = country;
        this.image = image;
        this.description = description;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
        this.isActive = isActive;
    }
}
