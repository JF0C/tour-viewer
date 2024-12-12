import { Pagination } from "@mui/material";
import { FunctionComponent, ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { searchTours } from "../../store/tourThunk";
import { LoadingSpinner } from "../shared/LoadingSpinner";

export type TourListBaseProps = {
    children: ReactNode
}

export const TourListBase: FunctionComponent<TourListBaseProps> = (props) => {
    const dispatch = useAppDispatch();
    const tourState = useAppSelector((state) => state.tour);

    const changePage = (page: number) => {
        dispatch(searchTours({ page: page, count: tourState.tourPagination.itemsPerPage }))
    }

    if (tourState.tours.length === 0 && !tourState.loading) {
        changePage(tourState.tourPagination.page);
    }
    
    if (tourState.loading) {
        return <LoadingSpinner />
    }

    return <div className="w-96">
        {props.children}
        <Pagination sx={{color: 'white'}} count={tourState.tourPagination.totalPages} siblingCount={0} boundaryCount={1}
            page={tourState.tourPagination.page} onChange={(e: any, page: number) => changePage(page)} />
    </div>
}