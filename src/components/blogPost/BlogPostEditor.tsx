import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { ImageUpload } from "../tourEditing/ImageUpload";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { setEditingBlogpost } from "../../store/blogPostStateReducer";

export const BlogPostEditor: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const blogPost = useAppSelector((state) => state.blog.editingBlogPost);

    if (!blogPost) {
        return <></>
    }

    return <div>
        <div className="flex flex-row justify-between items-center">
            <div className="font-bold text-xl">
                { blogPost.title === '' ? 'New Blog Post' : blogPost.title }
            </div>
            <Button>
                <FontAwesomeIcon icon={faX} onClick={() => dispatch(setEditingBlogpost(undefined))}/>
            </Button>
        </div>
            
        <ImageUpload />
    </div>
}