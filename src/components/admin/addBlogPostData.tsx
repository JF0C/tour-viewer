import { Button } from "@mui/material";
import { FunctionComponent } from "react";
import { useAppDispatch } from "../../store/store";
import { blogPostDataJobRequest } from "../../store/systemThunk";
import { BaseConfirmModal } from "../shared/BaseConfirmModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";

export const AddBlogPostData: FunctionComponent = () => {
    const dispatch = useAppDispatch();

    return <BaseConfirmModal buttonContent={
            <>
                <FontAwesomeIcon icon={faComment}/>&nbsp;
                Add Missing Blog Post Data
            </>
        }
        onConfirm={() => dispatch(blogPostDataJobRequest())}
    >
        <div>
            Adds countries to blogposts with no assigned countries.
            Detects tour timestamp from blog posts' closest point on the track.
        </div>
    </BaseConfirmModal>
}