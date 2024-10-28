import { LatLng } from "leaflet";
import { TrackPoint } from "../data/trackPoint";
import { ITrackEntity } from "../store/trackStateReducer";

export const trackClosestToPoint = (tracks: ITrackEntity[], point: LatLng): ITrackEntity | null => {
    if (tracks.length === 0) return null;
    let closestTrack = tracks[0];
    let distance = pointDistance(closestTrack.data.points[0], point);
    for (let t of tracks) {
        for (let p of t.data.points) {
            let d = pointDistance(p, point);
            if (d < distance) {
                distance = d;
                closestTrack = t;
            }
        }
    }
    return closestTrack;
}

const pointDistance = (point: TrackPoint, coordinates: LatLng) => {
    return (point.latitude - coordinates.lat) ** 2 + (point.longitude - coordinates.lng) ** 2;
}
