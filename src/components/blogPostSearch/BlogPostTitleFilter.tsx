import { TextField } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useDebounce } from "use-debounce";
import { Timeouts } from "../../constants/Timeouts";
import { setBlogPostSearchFilter } from "../../store/blogPostStateReducer";

export const BlogPostTitleFilter: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const blogPostState = useAppSelector((state) => state.blog);
    const [title, setTitle] = useState(blogPostState.filter.title);
    const [debouncedTitle] = useDebounce(title, Timeouts.DebounceTime);

    if (blogPostState.filter.title !== debouncedTitle) {
        dispatch(setBlogPostSearchFilter({
            ...blogPostState.filter,
            title: debouncedTitle
        }));
    }

    return <TextField size='small' label="Title" value={title} onChange={e => setTitle(e.target.value)} />
}