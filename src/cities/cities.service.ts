import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { sendForbidden } from 'src/helpers/helpers';
import { City, CityDocument } from './city.model';
import { CityCreateUpdateDTO } from './city-create-update.dto';
import { LandmarksService } from './../landmarks/landmarks.service';

@Injectable()
export class CitiesService {
    constructor(
        @InjectModel(City.name) private readonly cityModel: Model<CityDocument>,
        private landmarksService: LandmarksService
    ) {}

    /** Aimed exclusively towards CMS Admin users */
    async getAll(): Promise<City[]> {
        return await this.cityModel.find().exec();
    }

    /** Aimed towards all Portal visitors */
    async getAllActive(): Promise<City[]> {
        return await this.cityModel.find({ isActive: true }).exec();
    }

    /** Get by Id (with ugly url) is aimed towards CMS Admin users */
    async getSingleById(cityId: string): Promise<City> {
        return await this.cityModel
            .findById(cityId)
            .orFail(() => { throw new NotFoundException('City not found.') })
            .exec();
    }

    /** Get by slug (with pretty url) is aimed towards Portal visitors */
    async getSingleBySlug(citySlug: string): Promise<City> {
        return await this.cityModel
            .findOne({ slug: citySlug, isActive: true })
            .orFail(() => { throw new NotFoundException('City not found.') })
            .exec();
    }

    /** Insert aimed exclusively towards CMS Admin users */
    async insert(data: CityCreateUpdateDTO): Promise<City> {
        const newCity = new this.cityModel(data);
        return await newCity.save();
    }

    /** Update aimed exclusively towards CMS Admin users */
    async update(cityId: string, data: CityCreateUpdateDTO): Promise<City> {
        return await this.cityModel
            .findOneAndUpdate({ _id: cityId }, data, { new: true })
            .orFail(() => { throw new NotFoundException('City not found.') })
            .exec(); 
    }

    // TODO: TEMPORARY - Rethink all relations and deletion repercussions
    /** Delete aimed exclusively towards CMS Admin users */
    async delete(cityId: string): Promise<void> {
        await this.cityModel
            .deleteOne({ _id: cityId })
            .orFail(() => { throw new NotFoundException('City not found.') })
            .exec();
    }

    /** Custom data-transformation/validation middleware */
    async validateBodyData(data: CityCreateUpdateDTO): Promise<CityCreateUpdateDTO> {
        const validatedData = data;
        const isUpdateOperation = validatedData.hasOwnProperty('id');

        validatedData.slug = 
            await this.validateCitySlug(validatedData, isUpdateOperation); 
        
        if (!isUpdateOperation) { 
            validatedData.createdAt = new Date();
        } else {
            validatedData.modifiedAt = new Date();
            await this.updateRelatedLandmarks(validatedData);
        }
        return validatedData;
    }

    /** Each time Admin changes 'city name' 'city slug' or 'privacy options', we update 
     *  the 'nested city' object on all Landmarks where that city is assigned */
    private async updateRelatedLandmarks(data: CityCreateUpdateDTO): Promise<void> {
        const existingCity = await this.getSingleById(data['id']);
        const isChangedName = existingCity.name !== data.name;
        const isChangedSlug = existingCity.slug !== data.slug
        const isChangedPrivacy = existingCity.isActive !== data.isActive;
        if (isChangedName || isChangedPrivacy || isChangedSlug) {
            this.landmarksService.updateLandmarksNestedCities({
                id: data['id'],
                name: data.name,
                slug: data.slug,
                isActive: data.isActive
            });
        }    
    }

    /** Format url-slug value to desired form, check if it's
     * not already in use on other City before saving */
    private async validateCitySlug(data: CityCreateUpdateDTO, isUpdate: boolean): Promise<string> {
        data.slug = data.slug
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z0-9 -]/g, '')
            .replaceAll(' ', '-');
        const cityFound = await this.cityModel.findOne({ slug: data.slug });
        if (cityFound) {
            /* Check that cityFound is not the City we're currently editing */
            if (isUpdate && data['id'] === cityFound['id']) {
                return data.slug;
            }
            const resMessage = 
                `Slug '${data.slug}' already in use on City '${cityFound.name}'.`
            console.info(resMessage);
            sendForbidden(resMessage);
        } else {
            return data.slug;
        }
    }
}
