import { LatLngExpression } from "leaflet";
import { FunctionComponent } from "react";
import ReactLeafletTextPath from "react-leaflet-textpath";
import { geoToLatLngBounds } from "../../converters/bounds";
import { trackInMapBounds } from "../../converters/trackInMapBounds";
import { TrackEntity } from "../../data/trackEntity";
import { useAppSelector } from "../../store/store";

export type PreviewTrackLineProps = {
    track: TrackEntity,
    color: string
}

export const PreviewTrackLine: FunctionComponent<PreviewTrackLineProps> = (props) => {
    const trackState = useAppSelector((state) => state.track);
    const mapState = useAppSelector((state) => state.map);
    const zoomLevel = mapState.zoomLevel;
    const bounds = trackState.tracks.find(t => t.fileReference === props.track.fileReference && t.bounds)?.bounds;
    const mapBounds = mapState.viewBounds;

    if (!props.track.selected || props.track.data.points.length === 0) {
        return <></>
    }

    if (bounds) {
        const boundsLatLng = geoToLatLngBounds(bounds);
        if (!trackInMapBounds(boundsLatLng, geoToLatLngBounds(mapBounds))) {
            return <></>
        }
    }

    const pointSource = zoomLevel > 15 ? props.track.data.points :
        zoomLevel > 10 ? props.track.data.pointsTenth :
            props.track.data.pointsHundredth;

    const points: LatLngExpression[] = pointSource.map(p => [p.latitude, p.longitude]);

    return <>
        <ReactLeafletTextPath color={props.color} 
            weight={5}
            attributes={{ 'font-size': 20 }} 
            center offset={-5} 
            text={props.track.data.name} 
            positions={points} />
    </>
}