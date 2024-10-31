import L from "leaflet";
import { FunctionComponent } from "react";
import { Marker } from "react-leaflet";
import { CoordinatesDto } from "../../dtos/coordinatesDto";

export type TrackArrowProps = {
    from: CoordinatesDto;
    to: CoordinatesDto;
}

export const TrackArrow: FunctionComponent<TrackArrowProps> = (props) => {

    const arrowAngle = (from: CoordinatesDto, to: CoordinatesDto) => {
        var dy = to.latitude - from.latitude;
        var dx = Math.cos(Math.PI / 180 * from.longitude) * (to.longitude - from.longitude);
        var ang = ((Math.atan2(dy, dx) / Math.PI) * 180 * (-1));
        return (ang).toFixed(2);
    }

    const icon = L.divIcon({className: 'arrow-icon', html: 
        `<div class="flex flex-row justify-center items-center" style="text-align: center; transform: rotate(${arrowAngle(props.from, props.to)}deg)">&#10148;</div>` })

    return <Marker position={[props.from.latitude, props.from.longitude]} 
        icon={icon}
        />
}