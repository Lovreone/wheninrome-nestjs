import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { sendForbidden } from 'src/helpers/helpers';
import { Landmark, LandmarkDocument } from './landmark.model';
import { LandmarkCreateUpdateDTO } from './landmark-create-update.dto';
import { LandmarkCityDTO } from './landmark-city.dto';

@Injectable()
export class LandmarksService {
    constructor(
        @InjectModel(Landmark.name) private readonly landmarkModel: Model<LandmarkDocument>
    ) {}

    /** If provided with cityId param, it will return only the list 
     * of Landmarks from that City which are publically available */
    async getAllLandmarks(cityId?: string): Promise<Landmark[]> {
        return cityId ? 
            await this.landmarkModel.find({ 'city.id': cityId, isActive: true }).exec() :
            await this.landmarkModel.find().exec();
    }

    /** Get by Id (with ugly url) is aimed towards CMS Admin users */
    async getSingleById(landmarkId: string): Promise<Landmark> {
        return await this.landmarkModel
            .findById(landmarkId)
            .orFail(() => { throw new NotFoundException('Landmark not found.') })
            .exec();
    }

    /** Get by slug (with pretty url) is aimed towards Portal visitors */
    async getSingleBySlug(landmarkSlug: string): Promise<Landmark> {
        const landmarkFound = await this.landmarkModel
            .findOne({ slug: landmarkSlug })
            .orFail(() => { throw new NotFoundException('Landmark not found.') })
            .exec();
        if (landmarkFound.city.isActive && landmarkFound.isActive) {
            return landmarkFound;
        } else {
            throw new NotFoundException('Landmark not found.')
        }        
    }

    /** Insert aimed exclusively towards CMS Admin users */
    async insert(data: LandmarkCreateUpdateDTO): Promise<Landmark> {
        const newLandmark = new this.landmarkModel(data);
        return await newLandmark.save();
    }

    /** Update aimed exclusively towards CMS Admin users */
    async update(landmarkId: string, data: LandmarkCreateUpdateDTO): Promise<Landmark> {
        return await this.landmarkModel
            .findOneAndUpdate({ _id: landmarkId }, data, { new: true })
            .orFail(() => { throw new NotFoundException('Landmark not found.') })
            .exec();
    }

    // TODO: TEMPORARY - Rethink all relations and deletion repercussions
    /** Delete aimed exclusively towards CMS Admin users */
    async delete(landmarkId: string): Promise<void> {
        await this.landmarkModel
            .deleteOne({ _id: landmarkId })
            .orFail(() => { throw new NotFoundException('Landmark not found.') })
            .exec();
    }

    /** Custom data-transformation/validation middleware */
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
