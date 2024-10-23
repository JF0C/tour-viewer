import { FunctionComponent } from "react";
import { useAppSelector } from "../../store/store";


export const TourView: FunctionComponent = () => {
    const selectedTours = useAppSelector((state) => state.tour.currentTours);

    return <div>
        {selectedTours}
    </div>
}