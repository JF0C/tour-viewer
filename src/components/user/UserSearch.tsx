import { Input, Pagination } from "@mui/material";
import { FunctionComponent, ReactNode, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { searchUsers } from "../../store/userThunk";
import { LoadingSpinner } from "../shared/LoadingSpinner";

export type UserSearchProps = {
    children: ReactNode
}

export const UserSearch: FunctionComponent<UserSearchProps> = (props) => {
    const dispatch = useAppDispatch();
    const userState = useAppSelector((state) => state.user);
    const [usernameFilter, setUsernameFilter] = useState('');
    const [lastSearchTime, setLastSearchTime] = useState(0);
    const debounceInterval = 1000;

    const changePage = (page: number) => {
        dispatch(searchUsers({
            page: page,
            count: userState.userPagination.itemsPerPage,
            username: usernameFilter
        }));
    }

    const filterUsers = (username: string) => {
        setUsernameFilter(username);
        const currentTime = new Date().valueOf();
        if (currentTime < lastSearchTime + debounceInterval) {
            return;
        }
        setLastSearchTime(currentTime);
        const request = {
            page: userState.userPagination.page,
            count: userState.userPagination.itemsPerPage,
            username: username
        }
        console.log(request);
        dispatch(searchUsers(request));
    }

    if (userState.users === undefined && !userState.loading) {
        dispatch(searchUsers({
            page: userState.userPagination.page,
            count: userState.userPagination.itemsPerPage,
            username: usernameFilter
        }));
    }
    return <div className="w-56">
        <Input placeholder="Search user" value={usernameFilter} onChange={e => filterUsers(e.target.value)} />
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