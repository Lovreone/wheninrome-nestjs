import { CityDTO } from './city.dto';
import { City } from './city.model';

export class CityConverter {
    public static convertToDto(model: City): CityDTO {
        return new CityDTO(
            model.id || undefined,
            model.name || undefined,
            model.slug || undefined,
            model.country || undefined,
            model.image || undefined,
            model.description || undefined,
            model.landmarks || undefined
        );
    }
}
