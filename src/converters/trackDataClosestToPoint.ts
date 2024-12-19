import { TrackPoint } from "../data/trackPoint";
import { CoordinatesDto } from "../dtos/shared/coordinatesDto";
import { TrackEntity } from "../data/trackEntity";

export const trackClosestToPoint = (tracks: TrackEntity[], point: CoordinatesDto): TrackEntity | null => {
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

export const locationDistanceFromStart = (track: TrackEntity, coordinates: CoordinatesDto): number => {
    const points = track.data.points;
    var closestIndex = 0;
    var distance = pointDistance(points[0], coordinates);
    const cumulativeTravel = new Array<number>(points.length);
    cumulativeTravel[0] = points[0].distance;
    for (let k = 1; k < points.length; k++) {
        const p = points[k];
        cumulativeTravel[k] = cumulativeTravel[k - 1] + p.distance;
        const currentDistance = pointDistance(p, coordinates);
        if (currentDistance < distance) {
            distance = currentDistance;
            closestIndex = k;
        }
    }
    return cumulativeTravel[closestIndex];
}

const pointDistance = (point: TrackPoint, coordinates: CoordinatesDto) => {
    return (point.latitude - coordinates.latitude) ** 2 + (point.longitude - coordinates.longitude) ** 2;
}
