import { LandmarkSchema } from './landmark.model';
import { MongooseModule } from '@nestjs/mongoose';
import { LandmarksController } from './landmarks.controller';
import { LandmarksService } from './landmarks.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Landmark', schema: LandmarkSchema}]),
    ],
    controllers: [LandmarksController],
    providers: [LandmarksService],
})
export class LandmarksModule {
    constructor() {}
}
