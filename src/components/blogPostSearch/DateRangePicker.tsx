import { FunctionComponent } from "react";
import { CustomDatePicker } from "../shared/CustomDatePicker";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setBlogPostSearchFilter } from "../../store/blogPostStateReducer";

export const DateRangePicker: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const blogPostState = useAppSelector((state) => state.blog);

    const setFromDate = (d: Date | undefined) => {
        dispatch(setBlogPostSearchFilter({
            ...blogPostState.filter,
            fromDate: d?.valueOf() ?? undefined
        }))
    }

    const setToDate = (d: Date | undefined) => {
        dispatch(setBlogPostSearchFilter({
            ...blogPostState.filter,
            toDate: d?.valueOf() ?? undefined,
        }))
    }

    
    return <div className="flex flex-row flex-wrap gap-2">
        <CustomDatePicker onChange={setFromDate} label="From" value={new Date(blogPostState.filter.fromDate ?? Date.now())}/>
        <CustomDatePicker onChange={setToDate} label="To" value={new Date(blogPostState.filter.toDate ?? Date.now())}/>
    </div>
}