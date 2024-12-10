import { FormControl, InputLabel, MenuItem, Pagination, Select } from "@mui/material";
import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { searchTours } from "../../store/tourThunk";

export const TourSearchPagination: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const tourState = useAppSelector((state) => state.tour);
    const pageSizes = [10, 20, 50, 100];

    const changePage = (page: number) => {
        dispatch(searchTours({
            page: page,
            count: tourState.tourPagination.itemsPerPage,
            ...tourState.tourSearchFilter
        }));
    }

    const changePageSize = (itemsPerPage: number) => {
        dispatch(searchTours({
            page: tourState.tourPagination.page,
            count: itemsPerPage,
            ...tourState.tourSearchFilter
        }));
    }

    return <div className="flex flex-row flex-wrap gap-2 items-center">
        <Pagination sx={{ color: 'white' }} count={tourState.tourPagination.totalPages}
            siblingCount={0} boundaryCount={1}
            page={tourState.tourPagination.page}
            onChange={(e: any, page: number) => changePage(page)} />
        <FormControl size="small">
            <InputLabel id="page-size-label">Tours</InputLabel>
            <Select
                sx={{ color: 'white', width: '80px' }}
                labelId="page-size-label"
                id="page-size-select"
                value={tourState.tourPagination.itemsPerPage}
                label="Tours"
                onChange={(e) => changePageSize(Number(e.target.value))}
            >
                {
                    pageSizes.map((s, i) => <MenuItem key={'page-size-' + s} value={s}>
                        {s}
                    </MenuItem>)
                }
            </Select>
        </FormControl>
    </div>
}