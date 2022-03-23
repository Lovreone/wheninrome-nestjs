import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Landmark } from './landmark.model';
import { LandmarkCreateUpdateDTO } from './landmark-create-update.dto';
import { sendNotFound } from 'src/helpers/helpers';

@Injectable()
export class LandmarksService {
    constructor(
        @InjectModel('Landmark') private readonly landmarkModel: Model<Landmark>
    ) {}

    async getAll(): Promise<Landmark[]> {
        return await this.landmarkModel.find().exec();
    }

    async getSingle(landmarkId: string): Promise<Landmark> {
        try {
            return await this.landmarkModel.findById(landmarkId).orFail();
        } catch (error) {
            sendNotFound('Landmark not found.');
        }  
    }
 
    async insert(data: LandmarkCreateUpdateDTO): Promise<Landmark> {
        const newLandmark = new this.landmarkModel(data);       
        return await newLandmark.save();
    }

    async update(landmarkId: string, data: LandmarkCreateUpdateDTO): Promise<Landmark> {
        try {
            return await this.landmarkModel
                .findOneAndUpdate({ _id: landmarkId }, data, { new: true })
                .orFail()
                .exec();
        } catch (error) {
            sendNotFound('Landmark not found.')
        }
    }

    async delete(landmarkId: string): Promise<void> {
        try {
            await this.landmarkModel.deleteOne({ _id: landmarkId }).orFail().exec();
        } catch (error) {
            sendNotFound('Landmark not found.');
        }
    }
}
