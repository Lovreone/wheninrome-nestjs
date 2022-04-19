import { LandmarkCityDTO } from './landmark-city.dto';
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class LandmarkDTO {
    @ApiProperty()
    public id: string;

    @ApiProperty()
    public name: string;

    @ApiProperty()
    public slug: string;

    @ApiPropertyOptional()
    public description: string;

    @ApiProperty()
    public entranceFee: number;
   
    @ApiPropertyOptional()
    public city: LandmarkCityDTO;

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
        description: string, 
        entranceFee: number, 
        city: LandmarkCityDTO,
        isActive: boolean,
        createdAt: Date,
        modifiedAt: Date,
        
    ) {
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.description = description;
        this.entranceFee = entranceFee;
        this.city = city;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
        this.isActive = isActive;
    }
}
