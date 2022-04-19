import { LandmarkDTO } from './landmark.dto';
import { Landmark } from './landmark.model';

export class LandmarkConverter {
    public static convertToDto(model: Landmark): LandmarkDTO {
        return new LandmarkDTO(
            model.id || undefined,
            model.name || undefined,
            model.slug || undefined,
            model.description || undefined,
            model.entranceFee || undefined,
            model.officialWebsite || undefined,
            model.featuredImage || undefined,
            model.howToArrive || undefined,
            model.workingDays || undefined,
            model.workingHours || undefined,
            model.coordinates || undefined,
            model.city || undefined,
            model.isActive,
            model.createdAt || undefined,
            model.modifiedAt || undefined
        );
    }

    public static convertToDtoArray(modelsArr: Array<Landmark>): Array<LandmarkDTO> {
        return modelsArr.map(model => this.convertToDto(model)) || [];
    }

    /* FIXME: Remove when finisehd if unnecessary
     public static convertToModel(dto: LandmarkDTO): Landmark {
        return new Landmark(
            dto.id,
            dto.name,
            dto.description,
            dto.entranceFee
        );
    } */
}
