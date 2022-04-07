import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LandmarkDTO } from './../landmarks/landmark.dto';
import { ObjectId } from 'mongodb';

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

    @ApiPropertyOptional({
        isArray: true,
        type: ObjectId,
    })
    public landmarks: Array<ObjectId>

    constructor(id: string, name: string, slug: string, country: string, image: string, description: string, landmarks: Array<ObjectId>) {
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.country = country;
        this.image = image;
        this.description = description;
        this.landmarks = landmarks;
    }
}
