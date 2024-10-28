import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { ImageUpload } from "../tourEditing/ImageUpload";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faFloppyDisk, faX } from "@fortawesome/free-solid-svg-icons";
import { changeEditingBlogpostMessage, changeEditingBlogpostTitle, setEditingBlogpost } from "../../store/blogPostStateReducer";
import { EditableNameLabel } from "../shared/EditableNameLabel";
import { changeBlogPostLocationRequest, changeBlogPostMessageRequest, changeBlogPostTitleRequest, createBlogPostRequest } from "../../store/blogPostThunk";
import { EditableTextField } from "../shared/EditableTextField";

export const BlogPostEditor: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const blogPost = useAppSelector((state) => state.blog.editingBlogPost);
    const coordinatesChanged = useAppSelector((state) => state.blog.coordinatesChanged);

    if (!blogPost) {
        return <></>
    }

    const submitBlogPost = () => {
        if (blogPost.id === 0) {
            dispatch(createBlogPostRequest(blogPost))
        }
    }

    const changeTitle = (title: string) => {
        dispatch(changeEditingBlogpostTitle(title));
        if (blogPost.id !== 0) {
            dispatch(changeBlogPostTitleRequest({
                id: blogPost.id,
                title: title
            }));
        }
    }

    const changeLocation = () => {
        dispatch(changeBlogPostLocationRequest({
            id: blogPost.id,
            coordinates: {
                latitude: blogPost.latitude,
                longitude: blogPost.longitude
            }
        }))
    }

    const changeMessage = (message: string) => {
        dispatch(changeEditingBlogpostMessage(message))
        if (blogPost.id !== 0) {
            dispatch(changeBlogPostMessageRequest({
                id: blogPost.id,
                message: message
            }));
        }
    }

    return <div className="flex flex-col h-full">
        <div>
            <EditableNameLabel value={ blogPost.title === '' ? 'New Blog Post' : blogPost.title }
                className="font-bold text-xl"
                minLength={0} maxLength={100} name='Blog Post Title' inputType='text'
                onApply={changeTitle}
            />
        </div>
        <div className="flex-1 py-2">
            <ImageUpload />
            <div>
                <div>
                    Coordinates: <br/> 
                    {blogPost.latitude.toFixed(4)}, {blogPost.longitude.toFixed(4)}
                    {
                        coordinatesChanged ?
                        <Button onClick={changeLocation}>
                            <FontAwesomeIcon icon={faCheck} />
                        </Button>
                        :<></>
                    }
                </div>
            </div>
            <EditableTextField className="flex-none w-full" value={blogPost.message === '' ? '<no message>' : blogPost.message}
                rows={10} name='Blog Post Message' onApply={changeMessage} minLength={0} maxLength={1000} />
        </div>

        <div className="flex flex-row gap-2">
            {
                blogPost.id === 0 ? 
                <Button color='success' variant="outlined" onClick={submitBlogPost}>
                    <FontAwesomeIcon icon={faFloppyDisk} />
                    &nbsp;Save
                </Button>
                : <></>
            }
            <Button color='error' variant="outlined" onClick={() => dispatch(setEditingBlogpost(undefined))}>
                <FontAwesomeIcon icon={faX} />
                &nbsp;Cancel
            </Button>
        </div>
    </div>
}