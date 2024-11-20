import { FunctionComponent } from "react";
import { millisToDateString } from "../../converters/dateConverters";
import { KomootTourDto } from "../../dtos/komootTourDto";
import { toggleSelectedTour } from "../../store/komootStateReducer";
import { useAppDispatch, useAppSelector } from "../../store/store";

export type KomootTourListItemProps = {
    tour: KomootTourDto;
}

export const KomootTourListItem: FunctionComponent<KomootTourListItemProps> = (props) => {
    const dispatch = useAppDispatch();
    const selectedTours = useAppSelector((state) => state.komoot.selectedTours);
    const isSelected = selectedTours.includes(props.tour.id);

    const toggleSelected = () => {
        dispatch(toggleSelectedTour(props.tour.id))
    }

    return <div className="flex flex-col md:flex-row border border-white rounded-md" onClick={toggleSelected}>
        <div>
            <img width={100} src={props.tour.map_image_preview.src} alt={`tour preview ${props.tour.id}`}/>
        </div>
        <div className="flex flex-col p-2" style={{backgroundColor: isSelected ? 'green' : undefined}}>
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