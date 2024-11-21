import { parseGPX } from "@we-gold/gpxjs";
import { TrackData } from "../data/trackData";
import { haversine } from "./haversine";

export const parseGpxText = (data: string, name: string): TrackData => {
    const [gpx, error] = parseGPX(data);
    if (error) throw error
    const track = gpx.tracks[0];

    const endTime = track.points[track.points.length - 1].time?.valueOf() ?? 0;
    const startTime = track.points[0].time?.valueOf() ?? 0;
    const totalTime = endTime - startTime;

    const velocities: number[] = [0];

    let movementTime = 0;
    for (let k = 0; k < track.points.length - 1; k++) {
        const current = track.points[k];
        const next = track.points[k + 1];
        const currentTime = current.time?.valueOf() ?? 0;
        const nextTime = next.time?.valueOf() ?? 0;
        const dt = nextTime - currentTime;
        const dist = haversine(current, next);
        const metersPerSecond = dist / dt * 1000;
        const kph = metersPerSecond * 3.6;
        velocities.push(Math.min(kph, 100));

        if (dt < 30000 && dt > 0) {
            movementTime += dt;
        }
    }

    const trackData: TrackData = {
        name: name,
        distance: track.distance.total,
        elevation: {
            average: track.elevation.average ?? 0,
            maximum: track.elevation.maximum ?? 0,
            minimum: track.elevation.minimum ?? 0,
            positive: track.elevation.positive ?? 0,
            negative: track.elevation.negative ?? 0
        },
        points: track.points.map((p, i) => { return { 
            elevation: p.elevation ?? 0,
            latitude: p.latitude ?? 0,
            longitude: p.longitude ?? 0,
            time: p.time?.valueOf() ?? 0,
            velocity: velocities[i]
        }}),
        totalTime: totalTime,
        totalMovementTime: movementTime
    };
    
    return trackData;
}