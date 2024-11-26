import L from "leaflet";
import { FunctionComponent } from "react";
import { Marker } from "react-leaflet";
import { CoordinatesDto } from "../../dtos/shared/coordinatesDto";
import { useAppSelector } from "../../store/store";

export type TrackArrowProps = {
    from: CoordinatesDto;
    to: CoordinatesDto;
    zoomGroup: number;
}

const calcShowEvery = (zoomLevel: number): number => {
    if (zoomLevel > 16) return 1;
    if (zoomLevel === 16) return 2
    if (zoomLevel === 15) return 3
    if (zoomLevel === 14) return 4;
    if (zoomLevel === 13) return 6;
    if (zoomLevel === 12) return 8;
    if (zoomLevel === 11) return 10;
    if (zoomLevel === 10) return 20;
    if (zoomLevel === 9) return 30;
    if (zoomLevel === 8) return 50;
    if (zoomLevel === 7) return 70;
    if (zoomLevel === 6) return 90;
    if (zoomLevel === 5) return 120;
    if (zoomLevel === 4) return 150;
    if (zoomLevel === 3) return 200;
    if (zoomLevel === 2) return 300;
    return 400;
}

export const TrackArrow: FunctionComponent<TrackArrowProps> = (props) => {
    const zoomLevel = useAppSelector((state) => state.blog.zoomLevel);

    const arrowAngle = (from: CoordinatesDto, to: CoordinatesDto) => {
        var dy = to.latitude - from.latitude;
        var dx = Math.cos(Math.PI / 180 * from.longitude) * (to.longitude - from.longitude);
        var ang = ((Math.atan2(dy, dx) / Math.PI) * 180 * (-1));
        return (ang).toFixed(2);
    }

    const icon = L.divIcon({className: 'arrow-icon', html: 
        `<div class="flex flex-row justify-center items-center" style="text-align: center; transform: rotate(${arrowAngle(props.from, props.to)}deg)">&#10148;</div>` })

    let showEvery = calcShowEvery(zoomLevel);
    const showByZoomGroup = props.zoomGroup % showEvery === 0;

    if (!showByZoomGroup) {
        return <></>
    }

    return <Marker position={[props.from.latitude, props.from.longitude]} 
        icon={icon}
        />
}