import { TrackData } from "./trackData";

export type BoundsInternal = {
    south: number;
    west: number;
    north: number;
    east: number;
}

export type TrackEntity = {
    id: number;
    fileReference: string;
    data: TrackData;
    selected: boolean;
    loading: boolean;
    tourPosition: number;
    bounds?: BoundsInternal;
}
