import { FunctionComponent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { createLabelRequest, deleteLabelRequest, loadBlogPostLabelsRequest } from "../../store/blogPostLabelThunk";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { ValidatingTextField } from "../shared/ValidatingTextField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";
import { SmallFormLayout } from "../layout/SmallFormLayout";
import { NavLink } from "react-router-dom";
import { Paths } from "../../constants/Paths";

export const BlogPostLabelManager: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const blogPostState = useAppSelector((state) => state.blog);
    const [newLabel, setNewLabel] = useState('');
    const [valid, setValid] = useState(false);

    if (!blogPostState.availableLabelsLoaded && !blogPostState.loading) {
        dispatch(loadBlogPostLabelsRequest());
    }

    if (blogPostState.loading) {
        return <LoadingSpinner />
    }

    const createLabel = () => {
        dispatch(createLabelRequest(newLabel))
            .unwrap()
            .then(() => dispatch(loadBlogPostLabelsRequest()));
    }

    const deleteLabel = (label: string) => {
        dispatch(deleteLabelRequest(label))
            .unwrap()
            .then(() => dispatch(loadBlogPostLabelsRequest()));
    }

    const validateLabel = (label: string) => {
        if (!label.match(/^[A-Za-z0-9äöüß-]+$/)) {
            return 'label can contain only normal characters and digits';
        }
        return null;
    }

    return <SmallFormLayout buttons={
        <div className="w-full flex flex-row justify-center">
            <NavLink to={Paths.HomePage}>
                <Button>Done</Button>
            </NavLink>
        </div>
    }>
        <div>
            {blogPostState.availableLabels.map(l =>
                <div key={'edit-label-' + l} className="flex flex-row justify-between">
                    <div>{l}</div>
                    <div>
                        <Button color="error" onClick={() => deleteLabel(l)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                    </div>
                </div>)}
        </div>
        <div className="flex flex-row">
            <ValidatingTextField name='New Label' minLength={3} maxLength={20}
                onChange={l => setNewLabel(l)} customValidator={validateLabel} validCallback={setValid} />
            <Button disabled={!valid} color='success' onClick={createLabel}>
                <FontAwesomeIcon icon={faCheck} />
            </Button>
        </div>
    </SmallFormLayout>
}