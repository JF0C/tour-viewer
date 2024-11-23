import { FunctionComponent } from "react";
import { useAppSelector } from "../../store/store";
import { Marker } from "react-leaflet";
import L from "leaflet";

export const GraphDataPoint: FunctionComponent = () => {
    const infobarOpen = useAppSelector((state) => state.tour.showInfoBar);
    const coordinates = useAppSelector((state) => state.track.dataPointLocation);
    const selectedTrackCount = useAppSelector((state) => state.track.tracks.filter(t => t.selected).length);
    const outerRadius = 30;
    const innerRadius = 5;

    if (!infobarOpen || !coordinates || selectedTrackCount > 1) {
        return <></>
    }

    const icon = L.divIcon({
        className: 'graph-data-marker',
        html: `<div style="text-align: center; width: ${outerRadius}px; height: ${outerRadius}px;">` +
            `<svg viewBox="0 0 ${2*outerRadius} ${2*outerRadius}">` +
                `<circle cx="${outerRadius}" cy="${outerRadius}" r="${outerRadius}" style="fill-opacity: 40%;" fill="red"/>` +
                `<circle cx="${outerRadius}" cy="${outerRadius}" r="${innerRadius}" fill="red"/>` +
            `</svg>` +
        `</div>`,
        iconSize: [outerRadius, outerRadius],
    })


    return <Marker icon={icon}
        position={[coordinates.latitude, coordinates.longitude]}>
    </Marker>
}