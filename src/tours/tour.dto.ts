import { ApiProperty } from '@nestjs/swagger';

export class TourDTO {
    @ApiProperty({description: 'Tour item ID (Unique)'})
    public id: string;

    @ApiProperty({description: 'Ad hoc Tour name set by User (i.e. \' Rome Tuesday walk\')'})
    public name: string;

    @ApiProperty({description: 'User selected date of the Tour'})
    public tourDate: Date; 
    
    @ApiProperty({description: 'Tour starting location coordinates (i.e. 41.9061871712875, 12.475461122446518)'})
    public startingLocation: string; 

    @ApiProperty({description: 'Ad hoc Tour notes set by the user'})
    public tourNotes: string;

    @ApiProperty({description: 'ID of the User who created the Tour'})
    public userId: string;

    @ApiProperty({description: 'ID of the City selected for the Tour'})
    public cityId: string;

    @ApiProperty({description: 'Date of Tour item creation'})
    public createdAt: Date;

    @ApiProperty({description: 'Date of latest Tour item update'})
    public modifiedAt: Date;

    constructor(
        id: string, 
        name: string, 
        tourDate: Date, 
        startingLocation: string,
        tourNotes: string,
        userId: string,
        createdAt: Date,
        modifiedAt: Date,
    ) {
        this.id = id;
        this.name = name;
        this.tourDate = tourDate;
        this.startingLocation = startingLocation;
        this.tourNotes = tourNotes;
        this.userId = userId;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
    }
}
