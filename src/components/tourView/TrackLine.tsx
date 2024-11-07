import L, { LatLng } from "leaflet";
import { FunctionComponent, ReactNode } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { Layers } from "../../constants/Layers";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { ITrackEntity, setBounds } from "../../store/trackStateReducer";
import { TrackArrow } from "./TrackArrow";
import { MarkerIcons } from "../../constants/MarkerIcons";

export type TrackLineProps = {
    track: ITrackEntity,
    startMarker?: boolean
}

export const TrackLine: FunctionComponent<TrackLineProps> = (props) => {
    const dispatch = useAppDispatch();
    const trackState = useAppSelector((state) => state.track);
    const referencedTrack = useAppSelector((state) => state.blog.editingBlogPost?.trackFileReference);
    const zoomLevel = useAppSelector((state) => state.blog.zoomLevel);
    const map = useMap();

    if (!props.track.selected) {
        return <></>
    }

    const lastPoint = props.track.data.points[props.track.data.points.length - 1]

    const trackColor = referencedTrack === props.track.fileReference ? 'red' : 'black'

    let startLabel = 'Start';
    let endLabel = props.track.data.name;

    if (props.track.data.name.includes('->')) {
        const parts = props.track.data.name.split('->');
        startLabel = parts[0];
        startLabel = startLabel.trimEnd();
        endLabel = parts[1];
        endLabel = endLabel.trimStart();
    }

    const layer = new L.LayerGroup();
    layer.options.attribution = Layers.RoutesLayer;

    const arrows: ReactNode[] = [];

    const arrowInterval = Math.floor(50_000_000 / (zoomLevel ** 5));

    for (let k = 0; k < props.track.data.points.length - 1; k++) {

        if (k % arrowInterval === 0) {
            const point = props.track.data.points[k];
            const nextPoint = props.track.data.points[k + 1];
            arrows.push(<TrackArrow key={`t-${props.track.fileReference}-arr-${k}`} from={{ latitude: point.latitude, longitude: point.longitude }}
                to={{ latitude: nextPoint.latitude, longitude: nextPoint.longitude }} />)

        }
    }

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
            props.startMarker ?
                <Marker icon={MarkerIcons.blue} position={[props.track.data.points[0].latitude, props.track.data.points[0].longitude]}>
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