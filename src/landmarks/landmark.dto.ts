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

    constructor(id: string, name: string, slug: string, description: string, entranceFee: number) {
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.description = description;
        this.entranceFee = entranceFee;
    }
}
