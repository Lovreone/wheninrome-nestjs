import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { sendForbidden, sendNotFound } from 'src/helpers/helpers';
import { Landmark, LandmarkDocument } from './landmark.model';
import { LandmarkCreateUpdateDTO } from './landmark-create-update.dto';
import { LandmarkCityDTO } from './landmark-city.dto';

@Injectable()
export class LandmarksService {
    constructor(
        @InjectModel(Landmark.name) private readonly landmarkModel: Model<LandmarkDocument>
    ) {}

    async getAllLandmarks(cityId?: string): Promise<Landmark[]> {
        return cityId ? 
            await this.landmarkModel.find({ 'city.id': cityId, isActive: true }).exec() :
            await this.landmarkModel.find().exec();
    }

    async getSingleById(landmarkId: string): Promise<Landmark> {
        try {
            return await this.landmarkModel.findById(landmarkId).orFail();
        } catch (error) {
            sendNotFound('Landmark not found.');
        }  
    }

    async getSingleBySlug(landmarkSlug: string): Promise<Landmark> {
        const landmarkFound = await this.landmarkModel
            .findOne({ slug: landmarkSlug })
            .orFail(() => {throw new NotFoundException('Landmark not found.')});
        if (landmarkFound.city.isActive && landmarkFound.isActive) {
            return landmarkFound;
        } else {
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

    async validateBodyData(data: LandmarkCreateUpdateDTO): Promise<LandmarkCreateUpdateDTO> {
        const validatedData = data;
        const isUpdateOperation = data.hasOwnProperty('id');
        
        validatedData.slug = 
            await this.validateLandmarkSlug(validatedData, isUpdateOperation);

        if (!isUpdateOperation) { 
            validatedData.createdAt = new Date();
        } else {
            validatedData.modifiedAt = new Date();
        }
        return validatedData;
    }

    /** We keep a shortened copy of a parent City (id, name, slug, isActive) stored directly on Landmarks, 
     *  to have it readily available on Landmark lists, without making another getCity call. 
     *  When admin changes 'city name' or 'city privacy', we run this query to update 
     *  the 'shortened city' details stored on all Landmarks with that City */
    async updateLandmarksNestedCities(landmarkCity: LandmarkCityDTO): Promise<void> {       
        const response = await this.landmarkModel.updateMany(
            { 'city.id': new Types.ObjectId(landmarkCity.id) }, 
            { '$set': { 
                'city.name': landmarkCity.name, 
                'city.slug': landmarkCity.slug, 
                'city.isActive': landmarkCity.isActive 
            }}
        ).exec();
        if (response.modifiedCount > 0) {
            console.info(`Successfully updated ${response.modifiedCount} landmarks with new city name: '${landmarkCity.name}'`);
        }
    }

    /** Format url-slug value to desired form, check if it's
     * not already in use on other Landmark before saving */
    private async validateLandmarkSlug(data: LandmarkCreateUpdateDTO, isUpdate: boolean): Promise<string> {
        data.slug = data.slug
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z0-9 -]/g, '')
            .replaceAll(' ', '-');
        const landmarkFound = await this.landmarkModel.findOne({ slug: data.slug });
        if (landmarkFound) {
            /* Check that landmarkFound is not the Landmark we're currently editing */
            if (isUpdate && data['id'] === landmarkFound['id']) {
                return data.slug;
            }
            const resMessage = 
                `Slug '${data.slug}' already in use on Landmark '${landmarkFound.name}'.`;
            console.info(resMessage);
            sendForbidden(resMessage);
        } else {
            return data.slug;
        }
    }
}
