import { parseGPX } from "@we-gold/gpxjs";
import L from "leaflet";
import { FunctionComponent } from "react";
import { useMap } from "react-leaflet";
import { ITrackEntity, setBounds } from "../../store/trackStateReducer";
import { useAppDispatch, useAppSelector } from "../../store/store";

export type TrackRoutesProps = {
    track: ITrackEntity
}

export const TrackRoutes: FunctionComponent<TrackRoutesProps> = (props) => {
    const dispatch = useAppDispatch();
    const trackState = useAppSelector((state) => state.track);
    const [gpx, error] = parseGPX(props.track.data);
    const map = useMap();

    if (!props.track.selected) {
        return <></>
    }

    if (error) throw error

    for (let k = 0; k < gpx.tracks[0].points.length - 1; k++) {

    }

    const line = L.polyline(gpx.tracks[0].points
        .map(p => [p.latitude, p.longitude]), { color: 'black' })
        .addTo(map);
    if (!trackState.tracks.find(t => t.fileReference === props.track.fileReference && t.bounds)) {
        const bounds = line.getBounds();
        dispatch(setBounds({
            fileReference: props.track.fileReference,
            bounds: {
                south: bounds.getSouth(),
                west: bounds.getWest(),
                north: bounds.getNorth(),
                east: bounds.getEast()
            }
        }));
    }
    return <></>
}