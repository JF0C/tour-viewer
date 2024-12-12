import { FormControl, InputLabel, MenuItem, Pagination, Select } from "@mui/material";
import { FunctionComponent } from "react";
import { PaginationState } from "../../store/paginationState";

export type PaginationWithCountProps = {
    id: string
    pagination: PaginationState
    onChange: (pagination: PaginationState) => void
}

export const PaginationWithCount: FunctionComponent<PaginationWithCountProps> = (props) => {
    const pageSizes = [10, 20, 50, 100];

    return <div className="flex flex-row flex-wrap gap-2 items-center">
        <Pagination sx={{ color: 'white' }} count={props.pagination.totalPages}
            siblingCount={0} boundaryCount={1}
            page={props.pagination.page}
            onChange={(e: any, page: number) => props.onChange({
                ...props.pagination,
                page: page
            })} />
        <FormControl size="small">
            <InputLabel id={props.id + "-page-size-label"}>Count</InputLabel>
            <Select
                sx={{ color: 'white', width: '80px' }}
                labelId={props.id + "-page-size-label"}
                id={props.id + "-page-size-select"}
                value={props.pagination.itemsPerPage}
                label="Count"
                onChange={(e) => props.onChange({
                    ...props.pagination,
                    itemsPerPage: Number(e.target.value)
                })}
            >
                {
                    pageSizes.map((s, i) => <MenuItem key={props.id + '-page-size-' + s} value={s}>
                        {s}
                    </MenuItem>)
                }
            </Select>
        </FormControl>
    </div>
}