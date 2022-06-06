import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class TourDTO {
    @ApiProperty({description: 'Ad hoc Tour name set by User (i.e. \' Rome Tuesday walk\')'})
    name: string;

    @ApiProperty({description: 'User selected date of the Tour'})
    tourDate: Date; 
    
    @ApiProperty({description: 'Tour starting location coordinates (i.e. 41.9061871712875, 12.475461122446518)'})
    startingLocation: string; 

    @ApiProperty({description: 'Ad hoc Tour notes set by the user'})
    tourNotes: string;

    @ApiProperty({description: 'User which created the Tour (Mongo ObjectId)'})
    userId: Types.ObjectId;

    @ApiProperty({description: 'Date of Tour item creation'})
    createdAt: Date;

    @ApiProperty({description: 'Date of latest Tour item update'})
    modifiedAt: Date;
}
