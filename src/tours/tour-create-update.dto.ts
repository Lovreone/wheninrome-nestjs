import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, MaxLength, IsOptional, IsDateString } from 'class-validator';

export class TourCreateUpdateDTO {
    @ApiProperty({description: 'Ad hoc Tour name set by User (i.e. \' Rome Tuesday walk\')', minimum: 3, maximum: 20})
    @IsNotEmpty({message: '\'$property\' field is required.'})
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    name: string;

    @ApiProperty({description: 'User selected date of the Tour'})
    @IsNotEmpty({message: '\'$property\' field is required.'})
    @IsDateString()
    tourDate: Date; 
    
    @ApiProperty({description: 'Tour starting location coordinates (i.e. 41.9061871712875, 12.475461122446518)'})
    @IsNotEmpty({message: '\'$property\' field is required.'})
    @IsString()
    startingLocation: string; 

    @ApiPropertyOptional({description: 'Ad hoc Tour notes set by the user'})
    @IsOptional()
    @IsString()
    tourNotes: string;

    @ApiProperty({description: 'ID of the User who created the Tour'})
    @IsNotEmpty({message: '\'$property\' field is required.'})
    @IsString()
    userId: string;

    @ApiProperty({description: 'ID of the City selected for the Tour'})
    @IsNotEmpty({message: '\'$property\' field is required.'})
    @IsString()
    cityId: string;

    createdAt: Date;
    modifiedAt: Date;
}
