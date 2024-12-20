import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MenuItem, Select } from "@mui/material";
import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { selectTracks } from "../../store/trackStateReducer";
import { setOpenedBlogPost } from "../../store/blogPostStateReducer";

export const TrackSelector: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const tracks = useAppSelector((state) => state.tour.selectedTour?.tracks);
    const openedBlogPost = useAppSelector((state) => state.blog.openedBlogPost);

    if (!tracks) {
        return <></>
    }

    const selectTrack = (fileReference: string) => {
        if (openedBlogPost) {
            dispatch(setOpenedBlogPost());
        }
        if (fileReference === 'all') {
            dispatch(selectTracks(tracks.map(t => t.fileReference)))
        }
        else {
            dispatch(selectTracks([fileReference]));
        }
    }

    return <div className="track-selector flex flex-row flex-wrap items-center">
        <FontAwesomeIcon icon={faChevronRight} />
        <Select
            labelId="track-select-label"
            id="track-select"
            defaultValue='all'
            label="Track"
            size='small'
            sx={{ color: 'rgb(25, 118, 210)' }}
            onChange={(e) => selectTrack(e.target.value)}
        >
            <MenuItem value={'all'}>All</MenuItem>
            {
                tracks.map(t => <MenuItem key={'track-select-' + t.fileReference} value={t.fileReference}>
                    {t.tourPosition} - {t.name}
                </MenuItem>)
            }
        </Select>
    </div>
}