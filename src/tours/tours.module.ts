import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ToursController } from './tours.controller';
import { TourSchema } from './tour.model';
import { ToursService } from './tours.service';

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Tour', schema: TourSchema}]),
    ],
    controllers: [ToursController],
    providers: [ToursService]
})
export class ToursModule {
    constructor() {}
}
