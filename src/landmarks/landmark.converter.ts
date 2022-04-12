import { LandmarkDTO } from './landmark.dto';
import { Landmark } from './landmark.model';

export class LandmarkConverter {
    public static convertToDto(model: Landmark): LandmarkDTO {
        return new LandmarkDTO(
            model.id,
            model.name,
            model.slug,
            model.description,
            model.entranceFee,
            model.city
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
