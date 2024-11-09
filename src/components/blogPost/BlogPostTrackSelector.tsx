import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { FunctionComponent } from "react";
import { changeEditingBlogpostTrack } from "../../store/blogPostStateReducer";
import { changeBlogPostTrackRequest } from "../../store/blogPostThunk";
import { updateEditingBlogpost } from "../../store/stateHelpers";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { loadTourRequest } from "../../store/tourThunk";

export const BlogPostTrackSelector: FunctionComponent = () => {
    const dispatch = useAppDispatch();

    const tour = useAppSelector((state) => state.tour.selectedTour);
    const blogPost = useAppSelector((state) => state.blog.editingBlogPost);

    if (!tour || !blogPost) {
        return <></>
    }

    const setTrack = (trackId: number | string) => {
        trackId = Number(trackId);
        if (blogPost.id !== 0) {
            const currentBlogPostId = blogPost.id;
            dispatch(changeBlogPostTrackRequest({
                id: blogPost.id,
                trackId: trackId
            }))
            .unwrap()
            .then(() => {
                dispatch(loadTourRequest(tour.id))
                    .unwrap()
                    .then(tour => {
                        updateEditingBlogpost(dispatch, tour, currentBlogPostId);
                    });
            })
        }
        else {
            const fileReference = tour.tracks.find(t => t.id === trackId)?.fileReference ?? '';
            dispatch(changeEditingBlogpostTrack({
                trackId: trackId,
                trackFileReference: fileReference
            }));
        }
    }


    return <FormControl fullWidth size="small">
        <InputLabel id="track-select-label">Track</InputLabel>
        <Select
            labelId="track-select-label"
            id="blogpost-track-select"
            value={blogPost.trackId}
            label="Track"
            onChange={(e) => setTrack(e.target.value)}
        >
            {
                tour.tracks.map(t => <MenuItem key={'track-for-blogpost-select-' + t.id} value={t.id}>
                    {t.name}
                </MenuItem>)
            }
        </Select>
    </FormControl>
}