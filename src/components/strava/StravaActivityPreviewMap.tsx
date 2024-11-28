import { decode } from "@googlemaps/polyline-codec";
import { FunctionComponent } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { TrackDownloadItem } from "../../data/trackDownloadItem";
import L from "leaflet";
import { boundsFromLatLngTrack } from "../../converters/boundsFromLatLngTrack";
import { StravaActivityPreviewLine } from "./StravaActivityPreviewLine";
import 'leaflet/dist/leaflet.css';

export type StravaActivityPreviewMapProps = {
    track: TrackDownloadItem;
}

export const StravaActivityPreviewMap: FunctionComponent<StravaActivityPreviewMapProps> = (props) => {
    const trackPoints = decode(props.track.previewImageUrl, 5);

    const { minLat, maxLat, minLng, maxLng } = boundsFromLatLngTrack(trackPoints);
    const bounds = L.latLngBounds(L.latLng(minLat, minLng), L.latLng(maxLat, maxLng))
    
    return <MapContainer zoomControl={false} id={props.track.id}
        doubleClickZoom={false} dragging={false}
        scrollWheelZoom={false} touchZoom={false} attributionControl={false}
        style={{ userSelect: 'none' }}
        bounds={bounds}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        <StravaActivityPreviewLine points={trackPoints} />
    </MapContainer>
}