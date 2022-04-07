import { sendForbidden } from 'src/helpers/helpers';
import { CityCreateUpdateDTO } from './city-create-update.dto';
import { City } from './city.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CitiesService {
    constructor(
        @InjectModel('City') private readonly cityModel: Model<City>
    ) {}

    async getAll(): Promise<City[]> {
        return await this.cityModel.find().exec();
    }

    async getSingleById(cityId: string): Promise<City> {
        return await this.cityModel
            .findById(cityId)
            .orFail(() => { throw new NotFoundException('City not found.') })
            .exec();
    }

    async getSingleBySlug(citySlug: string): Promise<City> {
        return await this.cityModel
            .findOne({ slug: citySlug })
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

    /** To be used prior to saving slug to database: 
     * 1. Transforms submitted slug string into the required form
     * 2. Checks if a Landmark with that slug already exists */
    async validateBodyData(data: CityCreateUpdateDTO): Promise<CityCreateUpdateDTO> {
        const validatedData = data;
        validatedData.slug = data.slug
            .trim()
            .replace(/[^a-zA-Z0-9 -]/g, '')
            .replaceAll(' ', '-');
        
        const cityFound = await this.cityModel.findOne({ slug: validatedData.slug });
        if (cityFound) {
            sendForbidden(`City slug '${data.slug}' already in use on City '${cityFound.name}'.`);
        } else {
            return validatedData;
        }
    }
}
