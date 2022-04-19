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
    public officialWebsite: string;

    @ApiPropertyOptional()
    public featuredImage: string;

    @ApiPropertyOptional()
    public howToArrive: string;

    @ApiPropertyOptional()
    public workingDays: string;

    @ApiPropertyOptional()
    public workingHours: string;

    @ApiPropertyOptional()
    public coordinates: string;
   
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
        officialWebsite: string,
        featuredImage: string,
        howToArrive: string,
        workingDays: string,
        workingHours: string,
        coordinates: string,
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
        this.officialWebsite = officialWebsite;
        this.featuredImage = featuredImage;
        this.howToArrive = howToArrive;
        this.workingDays = workingDays;
        this.workingHours = workingHours;
        this.coordinates = coordinates;
        this.city = city;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
        this.isActive = isActive;
    }
}
