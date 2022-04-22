import { CityDTO } from './city.dto';
import { City } from './city.model';

export class CityConverter {
    public static convertToDto(model: City): CityDTO {
        return new CityDTO(
            model.id || undefined,
            model.name || undefined,
            model.slug || undefined,
            model.country || undefined,
            model.featuredImage || undefined,
            model.introText || undefined,
            model.localCurrency || undefined,
            model.description || undefined,
            model.isActive,
            model.createdAt || undefined,
            model.modifiedAt || undefined
        );
    }
}
