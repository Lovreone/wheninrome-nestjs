import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Landmark } from './landmark.model';
import { LandmarkCreateUpdateDTO } from './landmark-create-update.dto';
import { sendForbidden, sendNotFound } from 'src/helpers/helpers';

@Injectable()
export class LandmarksService {
    constructor(
        @InjectModel('Landmark') private readonly landmarkModel: Model<Landmark>
    ) {}

    async getAll(): Promise<Landmark[]> {
        return await this.landmarkModel.find().exec();
    }

    async getSingleById(landmarkId: string): Promise<Landmark> {
        try {
            return await this.landmarkModel.findById(landmarkId).orFail();
        } catch (error) {
            sendNotFound('Landmark not found.');
        }  
    }

    async getSingleBySlug(landmarkSlug: string): Promise<Landmark> {
        return await this.landmarkModel.findOne({ slug: landmarkSlug })
            .orFail(() => {throw new NotFoundException('Landmark not found.')});
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

    /** To be used prior to saving slug to database: 
     * 1. Transforms submitted slug string into the required form
     * 2. Checks if a Landmark with that slug already exists 
     * 3. If found, make sure is is not the Landmark we're currently editing */
    async validateBodyData(data: LandmarkCreateUpdateDTO): Promise<LandmarkCreateUpdateDTO> {
        const validatedData = data;

        validatedData.slug = data.slug
            .trim()
            .replace(/[^a-zA-Z0-9 -]/g, '')
            .replaceAll(' ', '-'); 
        const landmarkFound = await this.landmarkModel.findOne({ slug: validatedData.slug });

        if (landmarkFound) {
            const isUpdateOperation = data.hasOwnProperty('id');
            if (isUpdateOperation && data['id'] === landmarkFound['id']) {
                return validatedData;
            } 
            sendForbidden(`Landmark slug '${data.slug}' already in use on Landmark '${landmarkFound.name}'.`);
        } else {
            return validatedData;
        }
    }
}
