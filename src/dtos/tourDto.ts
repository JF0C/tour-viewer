import { EntityBaseDto } from "./entityBaseDto";
import { TrackDto } from "./trackDto";
import { UserReferenceDto } from "./userReferenceDto";

export type TourDto = EntityBaseDto & {
    name: string;
    startDate: Date;
    tracks: TrackDto[];
    participants: UserReferenceDto[];
}
