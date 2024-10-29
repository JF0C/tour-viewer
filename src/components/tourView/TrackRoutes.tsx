import L from "leaflet";
import { FunctionComponent } from "react";
import { useMap } from "react-leaflet";
import { Layers } from "../../constants/Layers";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { ITrackEntity, setBounds } from "../../store/trackStateReducer";

export type TrackRoutesProps = {
    track: ITrackEntity
}

export const TrackRoutes: FunctionComponent<TrackRoutesProps> = (props) => {
    const dispatch = useAppDispatch();
    const trackState = useAppSelector((state) => state.track);
    const referencedTrack = useAppSelector((state) => state.blog.editingBlogPost?.trackFileReference);
    const map = useMap();

    if (!props.track.selected) {
        return <></>
    }

    for (let k = 0; k < props.track.data.points.length - 1; k++) {

    }

    const trackColor = referencedTrack === props.track.fileReference ? 'red' : 'black'

    const layer = new L.LayerGroup();
    layer.options.attribution = Layers.RoutesLayer;
    const line = L.polyline(props.track.data.points
        .map(p => [p.latitude, p.longitude]), { color: trackColor }).addTo(layer);
    map.addLayer(layer);

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