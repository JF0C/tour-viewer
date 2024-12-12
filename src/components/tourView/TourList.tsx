import { FunctionComponent } from "react";
import { TourDto } from "../../dtos/tour/tourDto";
import { useAppSelector } from "../../store/store";
import { TourListBase } from "./TourListBase";
import { TourListItem } from "./TourListItem";

export type TourListProps = {
    onSelected: (tour: TourDto) => void
}

export const TourList: FunctionComponent<TourListProps> = (props) => {
    const tourState = useAppSelector((state) => state.tour);

    return <TourListBase>
        {
            tourState.tours.map(t =>
                <TourListItem key={'tour-item-' + t.id} tour={t} onSelected={props.onSelected}/>
            )
        }
    </TourListBase>
}