import { Input, Pagination } from "@mui/material";
import { FunctionComponent, ReactNode, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { searchUsers } from "../../store/userThunk";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { useDebounce } from "use-debounce";
import { setUserPagination } from "../../store/userStateReducer";

export type UserSearchProps = {
    children: ReactNode
}

export const UserSearch: FunctionComponent<UserSearchProps> = (props) => {
    const dispatch = useAppDispatch();
    const userState = useAppSelector((state) => state.user);
    const [usernameFilter, setUsernameFilter] = useState('');
    const debounceInterval = 1000;
    const [debouncedUsernameFilter] = useDebounce(usernameFilter, debounceInterval);

    const changePage = (page: number) => {
        dispatch(setUserPagination({
            page: page,
            count: userState.userPagination.itemsPerPage
        }));
    }

    useEffect(() => {
        dispatch(searchUsers({
            page: userState.userPagination.page,
            count: userState.userPagination.itemsPerPage,
            username: debouncedUsernameFilter
        }));
    }, [debouncedUsernameFilter, userState.userPagination.page, userState.userPagination.itemsPerPage])

    return <div className="w-56">
        <Input placeholder="Search user" value={usernameFilter} onChange={e => setUsernameFilter(e.target.value)} />
        {
            userState.loading ? <LoadingSpinner /> :
                <>
                    {props.children}
                    <Pagination count={userState.userPagination.totalPages} siblingCount={0} boundaryCount={1}
                        onChange={(e: any, page: number) => changePage(page)} />
                </>
        }
    </div>
}