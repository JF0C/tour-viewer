import { LatLngBounds } from "leaflet";
import { GeoBounds } from "../data/geoBounds";
import L from "leaflet";

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
