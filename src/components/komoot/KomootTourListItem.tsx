import { FunctionComponent } from "react";
import { KomootTourDto } from "../../dtos/komootTourDto";
import { millisToDateString } from "../../converters/dateConverters";

export type KomootTourListItemProps = {
    tour: KomootTourDto;
}

export const KomootTourListItem: FunctionComponent<KomootTourListItemProps> = (props) => {

    return <div className="flex flex-row">
        <div>
            <img height={100} src={props.tour.map_image_preview.src} alt={`tour preview ${props.tour.id}`}/>
        </div>
        <div className="flex flex-col">
            <div>
                {props.tour.name}
            </div>
            <div>
                {`${(props.tour.distance / 1000).toFixed(2)} km`}
            </div>
            <div>
                {millisToDateString(props.tour.date)}
            </div>
        </div>
    </div>
}