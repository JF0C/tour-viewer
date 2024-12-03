import { parseGPX } from "@we-gold/gpxjs";
import { TrackData } from "../data/trackData";
import { haversine } from "./haversine";
import { TrackPoint } from "../data/trackPoint";

const pointSliceToPoint = (currentSlice: TrackPoint[]): TrackPoint => {
    const lastPoint = currentSlice[currentSlice.length - 1];
    const count = currentSlice.length;
    return {
        elevation: lastPoint.elevation,
        latitude: lastPoint.latitude,
        longitude: lastPoint.longitude,
        time: lastPoint.time,
        distance: currentSlice.map(p => p.distance).reduce((a, b) => a + b),
        velocity: currentSlice.map(p => p.velocity).reduce((a, b) => a + b) / count,
        slope: currentSlice.map(p => p.slope).reduce((a, b) => a + b) / count
    };
}

const compressTrackpoints = (trackPoints: TrackPoint[], factor: number): TrackPoint[] => {
    const compressedLastIndex = Math.floor(trackPoints.length / factor);
    const compressedPoints: TrackPoint[] = new Array<TrackPoint>(compressedLastIndex - 1);
    compressedPoints.push(trackPoints[0]);
    for (let k = 0; k < compressedLastIndex; k++) {
        const currentSlice = trackPoints.slice(factor * k, factor * (k + 1));
        compressedPoints[k] = pointSliceToPoint(currentSlice);
    }
    if (compressedLastIndex < trackPoints.length) {
        const lastSlice = trackPoints.slice(compressedLastIndex, trackPoints.length);
        compressedPoints.push(pointSliceToPoint(lastSlice));
    }
    return compressedPoints;
}

export const parseGpxText = (data: string, name: string): TrackData => {
    const [gpx, error] = parseGPX(data);
    if (error) throw error
    const track = gpx.tracks[0];

    const endTime = track.points[track.points.length - 1].time?.valueOf() ?? 0;
    const startTime = track.points[0].time?.valueOf() ?? 0;
    const totalTime = endTime - startTime;

    const velocities: number[] = new Array<number>(track.points.length);
    velocities[0] = 0;

    const slopes: number[] = new Array<number>(track.points.length);
    slopes[0] = 0;

    const distances: number[] = new Array<number>(track.points.length);
    distances[0] = 0;

    let movementTime = 0;
    for (let k = 0; k < track.points.length - 1; k++) {
        const current = track.points[k];
        const next = track.points[k + 1];
        const currentTime = current.time?.valueOf() ?? 0;
        const nextTime = next.time?.valueOf() ?? 0;
        const dt = nextTime - currentTime;
        const dist = haversine(current, next);
        distances[k + 1] = dist;

        const metersPerSecond = dist / dt * 1000;
        const kph = metersPerSecond * 3.6;

        velocities[k + 1] = Math.min(kph, 100);

        const dh = (next.elevation ?? 0) - (current.elevation ?? 0);
        const slope = dh / Math.max(dist, 0.1);

        slopes[k + 1] = 100 * slope;

        if (dt < 30000 && dt > 0) {
            movementTime += dt;
        }
    }

    const trackPoints = track.points.map((p, i) => {
        return {
            elevation: p.elevation ?? 0,
            latitude: p.latitude ?? 0,
            longitude: p.longitude ?? 0,
            time: p.time?.valueOf() ?? 0,
            velocity: velocities[i],
            distance: distances[i],
            slope: slopes[i]
        }
    });

    const trackPointsTenth = compressTrackpoints(trackPoints, 10);
    const trackPointsHundredth = compressTrackpoints(trackPoints, 100);

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
        points: trackPoints,
        pointsTenth: trackPointsTenth,
        pointsHundredth: trackPointsHundredth,
        totalTime: totalTime,
        totalMovementTime: movementTime
    };

    return trackData;
}
