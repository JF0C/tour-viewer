import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { setInfobarOpen } from "../../store/viewState";
import { TourFilterControls } from "./TourFilterControls";
import { SearchResultItem } from "./SearchResultItem";
import { TourSearchPagination } from "./TourSearchPagination";
import { LoadingSpinner } from "../shared/LoadingSpinner";

export const TourPreviewPagination: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const tourState = useAppSelector((state) => state.tour);

    const close = () => {
        dispatch(setInfobarOpen(false))
    }
    return <div className="info-bar-content flex flex-col" >
        <div className="p-2 flex flex-row justify-between text-xl items-center bg-primary mb-2">
            <div className="font-bold flex-1">
                {tourState.tours.length} of {tourState.tourPagination.totalItems} Tours
            </div>
            <div className="flex flex-row">
                <Button onClick={close} style={{ minWidth: '20px' }}>
                    <FontAwesomeIcon icon={faX} />
                </Button>
            </div>
        </div>
        {
            tourState.loading ? <LoadingSpinner /> :
                <div className="p-2 flex flex-col gap-2">
                    <TourFilterControls />
                    <div className="flex flex-row flex-wrap gap-2 py-2">
                        {
                            tourState.tours.map((t, i) => <SearchResultItem key={'tour-result-' + t.id} index={i} tour={t} />)
                        }
                    </div>
                    <TourSearchPagination />
                </div>
        }
    </div>
}