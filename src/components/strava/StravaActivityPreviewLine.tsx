import { LatLngTuple } from "@googlemaps/polyline-codec";
import { FunctionComponent } from "react";
import { useMap } from "react-leaflet";
import { Layers } from "../../constants/Layers";
import L from "leaflet";

export type StravaActivityPreviewLineProps = {
    points: LatLngTuple[]
}

export const StravaActivityPreviewLine: FunctionComponent<StravaActivityPreviewLineProps> = (props) => {
    const map = useMap();
    const layer = new L.LayerGroup();

    layer.options.attribution = Layers.RoutesLayer;
    L.polyline(props.points.map(p => [p[0], p[1]], {color: 'blue'})).addTo(layer);
    layer.addTo(map);

    return <></>
}