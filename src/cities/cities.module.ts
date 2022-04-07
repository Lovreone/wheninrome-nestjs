import { CitySchema } from './city.model';
import { MongooseModule } from '@nestjs/mongoose';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'City', schema: CitySchema}])
    ],
    controllers: [CitiesController],
    providers: [CitiesService]
})
export class CitiesModule {
    constructor() {}
}
