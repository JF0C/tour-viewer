import { FunctionComponent } from "react";
import { useAppSelector } from "../store/store";


export const TourView: FunctionComponent = () => {
    const selectedTours = useAppSelector((state) => state.uistate.currentTours);

    return <div>
        {selectedTours}
    </div>
}