import { FormControl, InputLabel, MenuItem, Pagination, Select } from "@mui/material";
import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setTourPagination } from "../../store/tourStateReducer";
import { PaginationWithCount } from "../shared/PaginationWithCount";

export const TourSearchPagination: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const pagination = useAppSelector((state) => state.tour.tourPagination);

    return <PaginationWithCount
        pagination={pagination}
        id='tour-search'
        onChange={(p) => dispatch(setTourPagination({ page: p.page, count: p.itemsPerPage }))}
    />
}