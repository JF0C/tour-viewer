import { TrackPoint } from "../data/trackPoint";
import { CoordinatesDto } from "../dtos/shared/coordinatesDto";
import { ITrackEntity } from "../store/trackStateReducer";

export const trackClosestToPoint = (tracks: ITrackEntity[], point: CoordinatesDto): ITrackEntity | null => {
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

const pointDistance = (point: TrackPoint, coordinates: CoordinatesDto) => {
    return (point.latitude - coordinates.latitude) ** 2 + (point.longitude - coordinates.longitude) ** 2;
}
