import { ElevationData } from "./elevationData";
import { TrackPoint } from "./trackPoint";

export type TrackData = {
    name: string;
    elevation: ElevationData;
    distance: number;
    points: TrackPoint[];
}