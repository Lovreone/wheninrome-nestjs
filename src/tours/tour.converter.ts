import { TourCreateUpdateDTO } from './tour-create-update.dto';
import { TourDTO } from './tour.dto';
import { Tour } from './tour.model';
import { Types } from 'mongoose';

export class TourConverter {
    public static convertToDto(model: Tour): TourDTO {
        return new TourDTO(
            model.id || undefined,
            model.name || undefined,
            model.tourDate || undefined,
            model.startingLocation || undefined,
            model.tourNotes || undefined,
            model.userId.toHexString() || undefined,
            model.cityId.toHexString() || undefined,
            model.createdAt || undefined,
            model.modifiedAt || undefined
        );
    }

    public static convertToModel(dto: TourCreateUpdateDTO): Tour {
        const userId = new Types.ObjectId(dto.userId)
        const cityId = new Types.ObjectId(dto.cityId)
        const tour: Tour = { ...dto, userId, cityId }
        return tour;
    }
}
