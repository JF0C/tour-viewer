import { Button, Modal, TextField } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { UserReferenceDto } from "../../dtos/user/userReferenceDto";
import { setBlogPostSearchFilter } from "../../store/blogPostStateReducer";
import { searchBlogPostRequest } from "../../store/blogPostThunk";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { UserSearch } from "../user/UserSearch";
import { UserSearchResult } from "../user/UserSearchResult";
import { ModalBaseLayout } from "../shared/ModalBaseLayout";

export const AuthorSelector: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const blogPostState = useAppSelector((state) => state.blog);
    const searchFilter = blogPostState.filter;
    const [open, setOpen] = useState(false);

    const userSelected = (user: UserReferenceDto) => {
        setOpen(false);
        if (user.id === searchFilter.author) {
            return;
        }
        dispatch(setBlogPostSearchFilter({
            ...searchFilter,
            authorName: user.username,
            author: user.id
        }));
    }

    return <>
        <TextField sx={{ width: '100px' }} label="Author" size="small" className="no-input-text-field"
            value={searchFilter.authorName ?? 'All'} onClick={() => setOpen(true)} />
        <ModalBaseLayout open={open} openChange={setOpen}
            bottomRow={
                <div className="flex flex-row justify-between">
                    <Button onClick={() => userSelected({ username: undefined!, id: undefined! })}>All</Button>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                </div>
            }
        >
            <div className="flex flex-row flex-wrap">
                <UserSearch>
                    <UserSearchResult onUserSelected={userSelected} />
                </UserSearch>
            </div>
        </ModalBaseLayout>
    </>
}