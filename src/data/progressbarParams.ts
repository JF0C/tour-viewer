import { CoordinatesDto } from "../dtos/shared/coordinatesDto";

export type ProgressbarParams = {
    id: number;
    title: string;
    totalDistance: number;
    start: number;
    length: number;
    coordinates: CoordinatesDto;
    type: 'marker' | 'track' | 'tour';
}