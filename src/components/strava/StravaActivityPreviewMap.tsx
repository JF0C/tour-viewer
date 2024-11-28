import { decode } from "@googlemaps/polyline-codec";
import { FunctionComponent } from "react";
import { MapContainer } from "react-leaflet";
import { TrackDownloadItem } from "../../data/trackDownloadItem";
import L from "leaflet";
import { boundsFromLatLngTrack } from "../../converters/boundsFromLatLngTrack";
import { StravaActivityPreviewLine } from "./StravaActivityPreviewLine";

export type StravaActivityPreviewMapProps = {
    track: TrackDownloadItem;
}

export const StravaActivityPreviewMap: FunctionComponent<StravaActivityPreviewMapProps> = (props) => {
    const trackPoints = decode(props.track.previewImageUrl, 5);

    const { minLat, maxLat, minLng, maxLng } = boundsFromLatLngTrack(trackPoints);
    const bounds = L.latLngBounds(L.latLng(minLat, minLng), L.latLng(maxLat, maxLng))
    
    return <MapContainer zoomControl={false} id={props.track.id}
        scrollWheelZoom={true} touchZoom={true}
        style={{ userSelect: 'none' }} attributionControl={false}
        bounds={bounds}>
        <StravaActivityPreviewLine points={trackPoints} />
    </MapContainer>
}