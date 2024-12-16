import { CountryDto } from "../shared/countryDto";
import { EntityBaseDto } from "../shared/entityBaseDto";
import { TrackPointDto } from "../shared/trackPointDto";
import { TrackDto } from "../track/trackDto";
import { UserReferenceDto } from "../user/userReferenceDto";

export type TourDto = EntityBaseDto & {
    name: string;
    startDate: number;
    tracks: TrackDto[];
    author?: UserReferenceDto;
    countries: CountryDto[];
    previewTrack: TrackPointDto[];
    participants: UserReferenceDto[];
}
