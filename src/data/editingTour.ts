import { CountryDto } from "../dtos/shared/countryDto";
import { EditTrackDto } from "../dtos/track/editTrackDto";
import { UserReferenceDto } from "../dtos/user/userReferenceDto";
import { TrackUploadItem } from "./trackUploadItem";

export type EditingTour = {
    id: number;
    name: string;
    startDate: number;
    participants: UserReferenceDto[];
    countries: CountryDto[];
    tracks: EditTrackDto[];
    tracksToMerge: string[];
    tracksToUpload: TrackUploadItem[];
}