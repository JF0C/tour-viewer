import { EditTrackDto } from "../dtos/track/editTrackDto";
import { UserReferenceDto } from "../dtos/user/userReferenceDto";

export type EditingTour = {
    id: number;
    name: string;
    startDate: number;
    participants: UserReferenceDto[];
    tracks: EditTrackDto[];
    tracksToMerge: string[];
}