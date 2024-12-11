import { faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { FunctionComponent } from "react";
import { addLabelToBlogPostRequest, loadBlogPostLabelsRequest, removeLabelFromBlogPostRequest } from "../../store/blogPostLabelThunk";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { BaseConfirmModal } from "../shared/BaseConfirmModal";
import { BlogPostLabel } from "./BlogPostLabel";
import { setEditingBlogpost } from "../../store/blogPostStateReducer";
import { loadBlogPostDetailRequest } from "../../store/blogPostThunk";

export const BlogPostLabelEditor: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const blogPostState = useAppSelector((state) => state.blog);
    const blogPost = useAppSelector((state) => state.blog.editingBlogPost);

    if (!blogPost) {
        return <>no blogpost selected</>
    }

    if (blogPostState.loading) {
        return <LoadingSpinner />
    }

    if (!blogPostState.availableLabelsLoaded) {
        dispatch(loadBlogPostLabelsRequest());
    }

    const assignableLabels = blogPostState.availableLabels.filter(l => !blogPost.labels.includes(l));

    const addLabel = (label: string) => {
        if (!label) {
            return;
        }
        dispatch(addLabelToBlogPostRequest({
            blogPostId: blogPost.id,
            label: label
        })).unwrap().then(() => dispatch(loadBlogPostDetailRequest(blogPost.id))
            .unwrap().then(b => dispatch(setEditingBlogpost(b))));
    }

    return <div className="w-full flex flex-row flex-wrap gap-2">
        {
            blogPost.labels.map(l =>
                <BlogPostLabel label={l} blogPostId={blogPost.id} />
            )
        }
        {
            assignableLabels.length > 0 ?
                <BaseConfirmModal disableConfirm onConfirm={() => { }} buttonContent={
                    <>
                        <FontAwesomeIcon icon={faPlusCircle} />&nbsp;Label
                    </>
                }>
                    <div>
                        {
                            assignableLabels.map(l =>
                                <Button key={'label-' + l} onClick={() => addLabel(l)}>{l}</Button>
                            )
                        }
                    </div>
                </BaseConfirmModal>
                : <></>
        }
    </div>
}