import { LatLng } from "leaflet";
import { CoordinatesDto } from "../dtos/shared/coordinatesDto";

export const latLngToCoordinates = (latLng: LatLng): CoordinatesDto => {
    return {
        latitude: latLng.lat,
        longitude: latLng.lng
    }
}

export const coordinatesToLatLng = (coord: CoordinatesDto): LatLng => {
    return new LatLng(coord.latitude, coord.longitude);
}