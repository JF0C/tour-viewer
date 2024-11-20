import { Pagination } from "@mui/material";
import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { searchTours } from "../../store/tourThunk";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { TourListItem } from "./TourListItem";

export type TourListProps = {
    onSelected: () => void
}

export const TourList: FunctionComponent<TourListProps> = (props) => {
    const dispatch = useAppDispatch();
    const tourState = useAppSelector((state) => state.tour);

    const changePage = (page: number) => {
        dispatch(searchTours({ page: page, count: tourState.tourPagination.itemsPerPage }))
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
                <TourListItem key={'tour-item-' + t.id} tour={t} onSelected={props.onSelected}/>
            )
        }
        <Pagination sx={{color: 'white'}} count={tourState.tourPagination.totalPages} siblingCount={0} boundaryCount={1}
            page={tourState.tourPagination.page} onChange={(e: any, page: number) => changePage(page)} />
    </div>
}