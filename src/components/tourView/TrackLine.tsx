import { LatLng } from "leaflet";
import { FunctionComponent, ReactNode } from "react";
import { Marker, Polyline, Popup } from "react-leaflet";
import { MarkerIcons } from "../../constants/MarkerIcons";
import { geoToLatLngBounds } from "../../converters/bounds";
import { boundsFromLatLngTrack } from "../../converters/bounds";
import { trackInMapBounds } from "../../converters/trackInMapBounds";
import { TrackEntity } from "../../data/trackEntity";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setBounds } from "../../store/trackStateReducer";
import { TrackArrow } from "./TrackArrow";
import { DataColoredTrackLine } from "./DataColoredTrackLine";

export type TrackLineProps = {
    track: TrackEntity,
    color?: string,
    startMarker?: boolean,
    dataColor?: boolean
}

export const TrackLine: FunctionComponent<TrackLineProps> = (props) => {
    const dispatch = useAppDispatch();
    const trackState = useAppSelector((state) => state.track);
    const referencedTrack = useAppSelector((state) => state.blog.editingBlogPost?.trackFileReference);
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

    const trackColor = referencedTrack === props.track.fileReference ? 'red' : (props.color ?? 'black')
    const lastPoint = props.track.data.points[props.track.data.points.length - 1]

    let startLabel = 'Start';
    let endLabel = props.track.data.name;

    if (props.track.data.name.includes('->')) {
        const parts = props.track.data.name.split('->');
        startLabel = parts[0];
        startLabel = startLabel.trimEnd();
        endLabel = parts[1];
        endLabel = endLabel.trimStart();
    }

    const arrows: ReactNode[] = [];

    let zoomGroup = 0;
    for (let k = 0; k < props.track.data.points.length - 1; k++) {
        if (k % 30 === 0) {
            const point = props.track.data.points[k];
            const nextPoint = props.track.data.points[k + 1];
            arrows.push(<TrackArrow zoomGroup={zoomGroup} key={`t-${props.track.fileReference}-arr-${k}`}
                from={{ latitude: point.latitude, longitude: point.longitude }}
                to={{ latitude: nextPoint.latitude, longitude: nextPoint.longitude }} />)
            zoomGroup += 1;
        }
    }

    if (!bounds) {
        const { minLat, maxLat, minLng, maxLng } = boundsFromLatLngTrack(props.track.data.points
            .map(p => [p.latitude, p.longitude]))
        dispatch(setBounds({
            fileReference: props.track.fileReference,
            bounds: {
                south: minLat,
                west: minLng,
                north: maxLat,
                east: maxLng
            }
        }));
    }

    const pointSource = zoomLevel > 15 ? props.track.data.points :
        zoomLevel > 10 ? props.track.data.pointsTenth :
            props.track.data.pointsHundredth;

    return <>
        {
            props.dataColor ?
                <DataColoredTrackLine track={props.track} /> :
                <Polyline positions={pointSource.map(p => [p.latitude, p.longitude])} color={trackColor} />
        }
        {
            props.startMarker ?
                <Marker icon={MarkerIcons.blue}
                    position={[props.track.data.points[0].latitude,
                    props.track.data.points[0].longitude]}>
                    <Popup>
                        <div className="flex flex-col justify-center items-center">
                            <div className="font-bold text-xl">
                                {startLabel}
                            </div>
                        </div>
                    </Popup>
                </Marker>
                : <></>
        }
        <Marker icon={MarkerIcons.blue} position={new LatLng(lastPoint.latitude, lastPoint.longitude)}>
            <Popup>
                <div className="flex flex-col justify-center items-center">
                    <div className="font-bold text-xl">
                        {endLabel}
                    </div>
                </div>
            </Popup>
        </Marker>
        {
            arrows
        }
    </>
}