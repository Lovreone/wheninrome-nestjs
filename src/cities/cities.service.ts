import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { sendForbidden } from 'src/helpers/helpers';
import { City } from './city.model';
import { CityCreateUpdateDTO } from './city-create-update.dto';
import { LandmarksService } from './../landmarks/landmarks.service';


@Injectable()
export class CitiesService {
    constructor(
        @InjectModel('City') private readonly cityModel: Model<City>,
        private landmarksService: LandmarksService
    ) {}

    async getAll(): Promise<City[]> {
        return await this.cityModel.find().exec();
    }

    async getAllActive(): Promise<City[]> {
        return await this.cityModel.find({ isActive: true }).exec();
    }

    async getSingleById(cityId: string): Promise<City> {
        return await this.cityModel
            .findById(cityId)
            .orFail(() => { throw new NotFoundException('City not found.') })
            .exec();
    }

    async getSingleBySlug(citySlug: string): Promise<City> {
        return await this.cityModel
            .findOne({ slug: citySlug, isActive: true })
            .orFail(() => { throw new NotFoundException('City not found.') })
            .exec();
    }

    async insert(data: CityCreateUpdateDTO): Promise<City> {
        const newCity = new this.cityModel(data);
        return await newCity.save();
    }

    async update(cityId: string, data: CityCreateUpdateDTO): Promise<City> {
        return await this.cityModel
            .findOneAndUpdate({ _id: cityId }, data, { new: true })
            .orFail(() => { throw new NotFoundException('City not found.') })
            .exec(); 
    }

    async delete(cityId: string): Promise<void> {
        await this.cityModel
            .deleteOne({ _id: cityId })
            .orFail(() => { throw new NotFoundException('City not found.') })
            .exec();
    }

    async validateBodyData(data: CityCreateUpdateDTO): Promise<CityCreateUpdateDTO> {
        const validatedData = data;
        const isUpdateOperation = validatedData.hasOwnProperty('id');

        validatedData.slug = 
            await this.validateCityClug(data, isUpdateOperation); 
        
        if (!isUpdateOperation) { 
            validatedData.createdAt = new Date();
        } else {
            validatedData.modifiedAt = new Date();
            await this.updateRelatedLandmarks(validatedData);
        }
        return validatedData;
    }

    /** Each time Admin changes 'city name' or 'privacy options', we update 
     *  the 'nested city' object on all Landmarks where that city is assigned */
    private async updateRelatedLandmarks(data: CityCreateUpdateDTO): Promise<void> {
        const existingCity = await this.getSingleById(data['id']);
        const isChangedName = existingCity.name !== data.name;
        const isChangedPrivacy = existingCity.isActive !== data.isActive;
        if (isChangedName || isChangedPrivacy) {
            this.landmarksService.updateLandmarksNestedCities({
                id: data['id'],
                name: data.name,
                isActive: data.isActive
            });
        }    
    }

    /** Format url-slug value to desired form, check if it's
        not already in use on other Landmark before saving */
    private async validateCityClug(data: CityCreateUpdateDTO, isUpdate: boolean): Promise<string> {
        data.slug = data.slug
            .trim()
            .replace(/[^a-zA-Z0-9 -]/g, '')
            .replaceAll(' ', '-');
        const cityFound = await this.cityModel.findOne({ slug: data.slug });
        if (cityFound) {
            /* Check that cityFound is not the City we're currently editing */
            if (isUpdate && data['id'] === cityFound['id']) {
                return data.slug;
            }
            const resMessage = `City slug '${data.slug}' already in use on City '${cityFound.name}'.`
            console.info(resMessage)
            sendForbidden(resMessage);
        } else {
            return data.slug;
        }
    }
}
