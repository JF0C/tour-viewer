import { CoordinatesDto } from "../dtos/shared/coordinatesDto";
import { MarkerId } from "./markerId";

export type TrackMarkerData = MarkerId & {
    tourDistance: number;
    title: string;
    selected: boolean;
    coordinates: CoordinatesDto;
}