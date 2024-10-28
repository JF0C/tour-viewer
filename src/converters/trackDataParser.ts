import { parseGPX } from "@we-gold/gpxjs";
import { TrackData } from "../data/trackData";

export const parseGpxText = (data: string): TrackData => {
    const [gpx, error] = parseGPX(data);
    if (error) throw error
    const track = gpx.tracks[0];
    
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
        }})
    }
}