import { FunctionComponent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Button } from "@mui/material";
import { BlogPostLabel } from "../blogPost/BlogPostLabel";
import { ModalBaseLayout } from "../shared/ModalBaseLayout";
import { setBlogPostSearchFilter } from "../../store/blogPostStateReducer";
import { LabelToggle } from "./LabelToggle";

export const LabelsFilter: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const blogPostState = useAppSelector((state) => state.blog);
    const [open, setOpen] = useState(false);
    const selectedLabels = blogPostState.filter.labels ?? [];

    const addLabelToFilter = (label: string) => {
        const labels = blogPostState.filter.labels ? [...selectedLabels] : [];
        if (labels.includes(label)) {
            return;
        }
        labels.push(label);
        dispatch(setBlogPostSearchFilter({
            ...blogPostState.filter,
            labels: labels
        }));
    }

    const removeLabelFromFilter = (label: string) => {
        const newLabels: string[] = [];
        for (let l of selectedLabels) {
            if (l !== label) {
                newLabels.push(l);
            }
        }
        dispatch(setBlogPostSearchFilter({
            ...blogPostState.filter,
            labels: newLabels
        }));
    }

    return <div>
        <Button onClick={() => setOpen(true)}>
            {
                selectedLabels.length ?
                    <div className="flex flex-row flex-wrap gap-2">
                        {
                            selectedLabels.map(l => <BlogPostLabel key={'label-toggle-' + l} label={l} />)
                        }
                    </div>
                    :
                    <>Labels</>
            }
        </Button>
        <ModalBaseLayout open={open} openChange={setOpen} bottomRow={
            <div className="flex flex-row justify-center w-full">
                <Button onClick={() => setOpen(false)}>Done</Button>
            </div>
        }>
            <div className="flex flex-col gap-2">
                {
                    blogPostState.availableLabels.map(l =>
                        <LabelToggle label={l} isSelected={blogPostState.filter.labels?.includes(l)}
                            onSelect={addLabelToFilter}
                            onDeselect={removeLabelFromFilter} />)
                }
            </div>
        </ModalBaseLayout>
    </div>
}