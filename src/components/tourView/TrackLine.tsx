import L, { LatLng } from "leaflet";
import { FunctionComponent } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { Layers } from "../../constants/Layers";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { ITrackEntity, setBounds } from "../../store/trackStateReducer";

export type TrackLineProps = {
    track: ITrackEntity,
    isStart?: boolean
}

export const TrackLine: FunctionComponent<TrackLineProps> = (props) => {
    const dispatch = useAppDispatch();
    const trackState = useAppSelector((state) => state.track);
    const referencedTrack = useAppSelector((state) => state.blog.editingBlogPost?.trackFileReference);
    const map = useMap();

    if (!props.track.selected) {
        return <></>
    }

    const lastPoint = props.track.data.points[props.track.data.points.length - 1]

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
    return <>
    {
        props.isStart ? 
        <Marker position={[props.track.data.points[0].latitude, props.track.data.points[0].longitude]}>
            <Popup>
                Start
            </Popup>
        </Marker>
        :<></>
    }
    <Marker position={new LatLng(lastPoint.latitude, lastPoint.longitude)}>
        <Popup>
            {props.track.data.name}
        </Popup>
    </Marker>
    </>
}