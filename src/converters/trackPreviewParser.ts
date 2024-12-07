import { TrackEntity } from "../data/trackEntity";
import { TrackPointDto } from "../dtos/shared/trackPointDto";
import { TourDto } from "../dtos/tour/tourDto";
import { boundsFromTrackPointDtos } from "./bounds";
import { haversine } from "./haversine";
import { trackDataFromPoints } from "./trackDataParser";

const splitTourPreview = (points: TrackPointDto[]): TrackPointDto[][] => {
    const result: TrackPointDto[][] = [];

    let currentBatch: TrackPointDto[] = []

    for (let k = 0; k < points.length - 1; k++) {
        const current = points[k];
        currentBatch.push({
            ...current
        });
        const next = points[k+1];
        const distance = haversine(current, next);
        if (distance > 10_000) {
            result.push(currentBatch.map(p => { return { ...p }}));
            currentBatch = [];
        }
    }

    currentBatch.push({...(points[points.length - 1])});
    result.push(currentBatch.map(p => { return { ...p }}));
    
    return result;
}

export const parseTourPreview = (tour: TourDto): TrackEntity[] => {
    if (tour.previewTrack.length < 2) {
        return []
    }

    const tracks = splitTourPreview(tour.previewTrack);

    return tracks.map((t, i) => {
        return {
            id: tour.id,
            fileReference: tour.name,
            selected: true,
            loading: false,
            tourPosition: i,
            bounds: boundsFromTrackPointDtos(t),
            data: trackDataFromPoints(t, tour.name)
        }
    });
}
