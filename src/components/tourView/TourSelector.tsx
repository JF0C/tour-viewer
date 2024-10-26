import { Button, Pagination } from "@mui/material";
import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { loadTourRequest, searchTours } from "../../store/tourThunk";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { Roles } from "../../constants/Rolenames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

export type TourSelectorProps = {
    onSelected: () => void
}

export const TourSelector: FunctionComponent<TourSelectorProps> = (props) => {
    const dispatch = useAppDispatch();
    const tourState = useAppSelector((state) => state.tour);
    const isContributor = useAppSelector((state) => 
        state.auth.user?.roles.includes(Roles.Contributor) ?? false);

    const selectTour = (tourId: number) => {
        dispatch(loadTourRequest(tourId))
            .unwrap()
            .catch()
            .then(() => props.onSelected?.())
    }
    const changePage = (page: number) => {
        dispatch(searchTours({ page: page, count: tourState.tourPagination.itemsPerPage }))
    }

    const formatDate = (ticks: number) => {
        const date = new Date(ticks);
        const month = (date.getMonth() < 10 ? '0' : '') + date.getMonth().toString();
        const day = (date.getDate() < 10 ? '0': '') + date.getDate().toString();
        return `${day}.${month}.${date.getFullYear()}`
    }

    if (tourState.tours.length === 0 && !tourState.loading) {
        dispatch(searchTours({ page: tourState.tourPagination.page, count: tourState.tourPagination.itemsPerPage }))
    }
    if (tourState.loading) {
        return <LoadingSpinner />
    }
    return <div className="w-96">
        {
            tourState.tours.map(t =>
                <div className="flex flex-row">
                    <Button key={t.id} sx={{ width: '100%' }} onClick={() => selectTour(t.id)}>
                        <div className="flex flex-row items-center w-full justify-between" >
                            <div>
                                {t.name}
                            </div>
                            <div>
                                {formatDate(t.startDate)}
                            </div>
                        </div>
                    </Button>
                    {
                        isContributor ? <Button>
                            <FontAwesomeIcon icon={faEdit} />
                        </Button>
                        :<></>
                    }
                </div>
            )
        }
        <Pagination count={tourState.tourPagination.totalPages} siblingCount={0} boundaryCount={1}
            onChange={(e: any, page: number) => changePage(page)} />
    </div>
}