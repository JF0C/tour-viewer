import { LatLngTuple } from "@googlemaps/polyline-codec";

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