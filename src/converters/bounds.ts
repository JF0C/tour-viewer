import { LatLngBounds } from "leaflet";
import { LatLngTuple } from "@googlemaps/polyline-codec";
import { GeoBounds } from "../data/geoBounds";
import L from "leaflet";
import { TrackPointDto } from "../dtos/shared/trackPointDto";

export const latLngToGeoBounds = (bounds: LatLngBounds): GeoBounds => {
    return {
        north: bounds.getNorth(),
        west: bounds.getWest(),
        south: bounds.getSouth(),
        east: bounds.getEast()
    }
}

export const geoToLatLngBounds = (bounds: GeoBounds): LatLngBounds => {
    return L.latLngBounds(L.latLng(bounds.south, bounds.west), L.latLng(bounds.north, bounds.east));
}

export const boundsFromLatLngTrack = (points: LatLngTuple[]) => {
    let minLat = points[0][0];
    let maxLat = minLat;
    let minLng = points[0][1];
    let maxLng = minLng;
    for (let point of points) {
        if (point[0] < minLat) {
            minLat = point[0];
        }
        if (point[0] > maxLat) {
            maxLat = point[0];
        }
        if (point[1] < minLng) {
            minLng = point[1];
        }
        if (point[1] > maxLng) {
            maxLng = point[1];
        }
    }
    return { minLat, maxLat, minLng, maxLng };
}

export const boundsFromTrackPointDtos = (points: TrackPointDto[]): GeoBounds => {
    let south = points[0].latitude;
    let west = points[0].longitude;
    let north = south;
    let east = west;

    for (let p of points) {
        if (p.latitude > north) north = p.latitude;
        if (p.latitude < south) south = p.latitude;
        if (p.longitude > east) east = p.longitude;
        if (p.longitude < west) west = p.longitude;
    }

    return { south, north, west, east};
}
