import { EntityBaseDto } from "../shared/entityBaseDto";
import { TrackDto } from "../track/trackDto";
import { UserReferenceDto } from "../user/userReferenceDto";

export type TourDto = EntityBaseDto & {
    name: string;
    startDate: number;
    tracks: TrackDto[];
    participants: UserReferenceDto[];
}
