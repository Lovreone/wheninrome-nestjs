import { TourDTO } from './tour.dto';
import { Tour } from './tour.model';

export class TourConverter {
    public static convertToDto(model: Tour): TourDTO {
        return new TourDTO(
            model.id || undefined,
            model.name || undefined,
            model.tourDate || undefined,
            model.startingLocation || undefined,
            model.tourNotes || undefined,
            model.userId || undefined,
            model.createdAt || undefined,
            model.modifiedAt || undefined
        );
    }
}
