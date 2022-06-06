import { TourCreateUpdateDTO } from './tour-create-update.dto';
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TourConverter } from './tour.converter';

import { Tour, TourDocument } from './tour.model';

@Injectable()
export class ToursService {
    constructor(
        @InjectModel(Tour.name) private readonly tourModel: Model<TourDocument>,
    ) {}

    /** If provided with userId param, it will return only the list 
     * of Tours from that User. Get All is aimed towards for CMS Admin */
    async getAllTours(userId?: string): Promise<Tour[]> {
        return userId ? 
            await this.tourModel.find({ userId: userId }).exec() :
            await this.tourModel.find().exec();
    }

    /** Get by Id is aimed towards both CMS Admin and Portal Users */
    async getSingleById(tourId: string): Promise<Tour> {
        return await this.tourModel
            .findById(tourId)
            .orFail(() => { throw new NotFoundException('Tour not found.') })
            .exec();
    }

    /** Insert aimed towards Portal Users */
    async insert(data: TourCreateUpdateDTO): Promise<Tour> {
        const newTour = new this.tourModel(TourConverter.convertToModel(data));
        return await newTour.save();
    }

    /** Update aimed towards Portal Users */
    async update(tourId: string, data: TourCreateUpdateDTO): Promise<Tour> {
        return await this.tourModel
            .findOneAndUpdate({ _id: tourId }, data, { new: true })
            .orFail(() => { throw new NotFoundException('Tour not found.') })
            .exec(); 
    }

    /** Delete aimed towards Portal Users */
    async delete(tourId: string): Promise<void> {
        await this.tourModel
            .deleteOne({ _id: tourId })
            .orFail(() => { throw new NotFoundException('Tour not found.') })
            .exec();
    }

    /** Custom data-transformation/validation middleware */
    async validateBodyData(data: TourCreateUpdateDTO): Promise<TourCreateUpdateDTO> {
        const validatedData = data;
        const isUpdateOperation = validatedData.hasOwnProperty('id');
    
        if (!isUpdateOperation) { 
            validatedData.createdAt = new Date();
        } else {
            validatedData.modifiedAt = new Date();
        }
        return validatedData;
    }
}
