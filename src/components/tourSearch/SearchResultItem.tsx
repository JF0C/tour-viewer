import { FunctionComponent } from "react";
import { TourDto } from "../../dtos/tour/tourDto";
import { Colors } from "../../constants/Colors";

export type SearchResultItemProps = {
    tour: TourDto;
    index: number;
}

export const SearchResultItem: FunctionComponent<SearchResultItemProps> = (props) => {
    
    const color = Colors.colorCircle(props.index);

    return <div className="border border-4 rounded-md p-2" style={{borderColor: color}}>
        {props.tour.name}
    </div>
}