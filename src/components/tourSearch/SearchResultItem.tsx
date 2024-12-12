import { FunctionComponent } from "react";
import { Colors } from "../../constants/Colors";
import { TourDto } from "../../dtos/tour/tourDto";
import { useAppDispatch } from "../../store/store";
import { loadTourRequest } from "../../store/tourThunk";
import { clearTracks } from "../../store/trackStateReducer";
import { setSelectedTourId } from "../../store/tourStateReducer";

export type SearchResultItemProps = {
    tour: TourDto;
    index: number;
}

export const SearchResultItem: FunctionComponent<SearchResultItemProps> = (props) => {
    const dispatch = useAppDispatch();
    const color = Colors.colorCircle(props.index);

    const loadTour = () => {
        dispatch(clearTracks());
        dispatch(setSelectedTourId(props.tour.id));
        dispatch(loadTourRequest(props.tour.id));
    }

    return <div onClick={loadTour}
        className="border border-4 rounded-md p-2" 
        style={{borderColor: color, cursor: 'pointer'}}>
        {props.tour.name}
    </div>
}