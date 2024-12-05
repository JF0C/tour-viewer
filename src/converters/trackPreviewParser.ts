import { TrackEntity } from "../data/trackEntity";
import { TourDto } from "../dtos/tour/tourDto";
import { boundsFromTrackPointDtos } from "./bounds";
import { haversine } from "./haversine";

export const parseTourPreview = (tour: TourDto): TrackEntity => {
    if (tour.previewTrack.length < 2) {
        return {
            id: tour.id,
            fileReference: tour.name,
            selected: true,
            loading: false,
            tourPosition: tour.id,
            bounds: {
                north: 0,
                south: 0,
                west: 0,
                east: 0
            },
            data: {
                name: tour.name,
                elevation: {
                    minimum: 0,
                    maximum: 0,
                    average: 0,
                    positive: 0,
                    negative: 0
                },
                points: [],
                pointsTenth: [],
                pointsHundredth: [],
                totalTime: 0,
                totalMovementTime: 0,
                distance: 0
            }
        }
    }


    const endTime = tour.previewTrack[tour.previewTrack.length - 1].time;
    const startTime = tour.previewTrack[0].time;
    const totalTime = endTime - startTime;

    const velocities: number[] = new Array<number>(tour.previewTrack.length);
    velocities[0] = 0;

    const slopes: number[] = new Array<number>(tour.previewTrack.length);
    slopes[0] = 0;

    const distances: number[] = new Array<number>(tour.previewTrack.length);
    distances[0] = 0;

    let minElevation = tour.previewTrack[0].elevation;
    let maxElevation = tour.previewTrack[0].elevation;
    let posElevation = 0;
    let negElevation = 0;
    let movementTime = 0;
    for (let k = 0; k < tour.previewTrack.length - 1; k++) {
        const current = tour.previewTrack[k];
        const next = tour.previewTrack[k + 1];
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
        if (current.elevation > maxElevation) {
            maxElevation = current.elevation;
        }
        if (current.elevation < minElevation) {
            minElevation = current.elevation;
        }
        const elevationDelta = next.elevation - current.elevation;
        if (elevationDelta > 0) {
            posElevation += elevationDelta;
        }
        else {
            negElevation -= elevationDelta;
        }
    }

    const trackPoints = tour.previewTrack.map((p, i) => {
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


    return {
        id: tour.id,
        fileReference: tour.name,
        selected: true,
        loading: false,
        tourPosition: tour.id,
        bounds: boundsFromTrackPointDtos(tour.previewTrack),
        data: {
            name: tour.name,
            elevation: {
                minimum: minElevation,
                maximum: maxElevation,
                average: 0,
                positive: posElevation,
                negative: negElevation
            },
            points: trackPoints,
            pointsTenth: trackPoints,
            pointsHundredth: trackPoints,
            totalTime: totalTime,
            totalMovementTime: movementTime,
            distance: distances.reduce((a, b) => a + b)
        }
    }
}