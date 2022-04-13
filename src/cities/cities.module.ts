import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CitiesController } from './cities.controller';
import { CitySchema } from './city.model';
import { LandmarkSchema } from './../landmarks/landmark.model';
import { CitiesService } from './cities.service';
import { LandmarksService } from './../landmarks/landmarks.service';

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'City', schema: CitySchema}]),
        MongooseModule.forFeature([{name: 'Landmark', schema: LandmarkSchema}]),
    ],
    controllers: [CitiesController],
    providers: [CitiesService, LandmarksService]
})
export class CitiesModule {
    constructor() {}
}
