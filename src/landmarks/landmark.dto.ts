import { LandmarkCityDTO } from './landmark-city.dto';
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class LandmarkDTO {
    @ApiProperty({description: 'Landmark item ID (Unique)'})
    public id: string;

    @ApiProperty({description: 'Internationally recognized Landmark name'})
    public name: string;

    @ApiProperty({description: 'Landmark \'pretty-url\' slug (Unique)'})
    public slug: string;

    @ApiProperty({description: 'Short introductory text of the Landmark (Sub-title)'})
    public introText: string;

    @ApiPropertyOptional({description: 'A longer descriptive text used on Landmark page'})
    public description: string;

    @ApiPropertyOptional({description: 'Entrance fee for the Landmark (null-unknown; 0-free)'})
    public entranceFee: number;

    @ApiPropertyOptional({description: 'URL to the official website of the Landmark'})
    public officialWebsite: string;

    @ApiPropertyOptional({description: 'Featured image of the Landmark'})
    public featuredImage: string;

    @ApiPropertyOptional({description: 'A short descriptive text on how to get to the landmark'})
    public howToArrive: string;

    @ApiPropertyOptional({description: 'A short descriptive text of working/non-working days'})
    public workingDays: string;

    @ApiPropertyOptional({description: 'A short descriptive text of working/non-working hours'})
    public workingHours: string;

    @ApiPropertyOptional({description: 'Coordinates pointing to the center of the landmark (i.e. 41.9061871712875, 12.475461122446518)'})
    public coordinates: string;
   
    @ApiPropertyOptional({description: 'Nested City object, containing necessary parent city data for quick access', type: LandmarkCityDTO})
    public city: LandmarkCityDTO;

    @ApiPropertyOptional({description: 'Flag determining whether Landmark is available to the Public or not'})
    public isActive: boolean;

    @ApiPropertyOptional({description: 'Date of Landmark item creation'})
    public createdAt: Date;

    @ApiPropertyOptional({description: 'Date of latest Landmark item update'})
    public modifiedAt: Date;

    constructor(
        id: string, 
        name: string, 
        slug: string, 
        introText: string,
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
        this.introText = introText;
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
