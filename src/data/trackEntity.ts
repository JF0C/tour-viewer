import { GeoBounds } from "./geoBounds";
import { TrackData } from "./trackData";

export type TrackEntity = {
    id: number;
    fileReference: string;
    data: TrackData;
    selected: boolean;
    loading: boolean;
    tourPosition: number;
    bounds?: GeoBounds;
}
