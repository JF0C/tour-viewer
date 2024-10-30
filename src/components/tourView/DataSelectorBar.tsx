import { FunctionComponent } from "react";
import { useAppSelector } from "../../store/store";
import { TourSelector } from "./TourSelector";
import { TrackSelector } from "./TrackSelector";


export const TourSelectorBar: FunctionComponent = () => {
    const tour = useAppSelector((state) => state.tour.selectedTour);
    const user = useAppSelector((state) => state.auth.user);
    if (document.location.pathname !== "/" || !user) {
        return <></>
    }

    return <div style={{ top: '60px', zIndex: 1000 }}
        className="flex flex-row w-full absolute justify-center items-center drop-shadow">
        <div className="selector-bar rounded-md border-black flex flex-row">
            <TourSelector title={tour?.name ?? 'Select Tour'} onSelected={() => { }} />
            <TrackSelector />
        </div>
    </div>
}