import { parseGPX } from "@we-gold/gpxjs";
import { TrackData } from "../data/trackData";

export const parseGpxText = (data: string): TrackData => {
    const [gpx, error] = parseGPX(data);
    if (error) throw error
    const track = gpx.tracks[0];

    const endTime = track.points[track.points.length - 1].time?.valueOf() ?? 0;
    const startTime = track.points[0].time?.valueOf() ?? 0;
    const totalTime = endTime - startTime;

    let movementTime = 0;
    for (let k = 0; k < track.points.length - 1; k++) {
        const current = track.points[k];
        const next = track.points[k + 1];
        const currentTime = current.time?.valueOf() ?? 0;
        const nextTime = next.time?.valueOf() ?? 0;
        const dt = nextTime - currentTime;
        if (dt < 30000 && dt > 0) {
            movementTime += dt;
        }
    }
    
    return {
        name: track.name ?? '',
        distance: track.distance.total,
        elevation: {
            average: track.elevation.average ?? 0,
            maximum: track.elevation.maximum ?? 0,
            minimum: track.elevation.minimum ?? 0,
            positive: track.elevation.positive ?? 0,
            negative: track.elevation.negative ?? 0
        },
        points: track.points.map(p => { return { 
            elevation: p.elevation ?? 0,
            latitude: p.latitude ?? 0,
            longitude: p.longitude ?? 0,
            time: p.time?.valueOf() ?? 0
        }}),
        totalTime: totalTime,
        totalMovementTime: movementTime
    }
}