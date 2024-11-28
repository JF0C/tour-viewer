import { GpxPoint } from "../data/gpxPoint";
import { TrackEntity } from "../data/trackEntity";
import { gpxFromPoints } from "./gpxFromPoints";

export const mergeTracksToGpx = (tracks: TrackEntity[], name: string): string => {
    const numberOfPoints = tracks.map(t => t.data.points.length)
        .reduce((a, b) => a + b)
    const points: GpxPoint[] = new Array<GpxPoint>(numberOfPoints);
    
    for (let track of tracks) {
        for (let point of track.data.points) {
            points.push({
                lat: point.latitude,
                lon: point.longitude,
                ele: point.elevation,
                time: point.time
            })
        }
    }

    return gpxFromPoints(points, name, tracks.map(t => t.data.points[0].time).sort()[0])
}