import { faChevronCircleDown, faChevronRight, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, MenuItem, Select } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { selectTracks } from "../../store/trackStateReducer";
import { setOpenedBlogPost } from "../../store/blogPostStateReducer";
import { ModalBaseLayout } from "../shared/ModalBaseLayout";

export const TrackSelector: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
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

    return <>
        <Button onClick={() => setOpen(true)}>
            <FontAwesomeIcon className="text-white" icon={faChevronCircleDown} />
        </Button>
        <ModalBaseLayout open={open} openChange={setOpen}
            bottomRow={
                <Button onClick={() => setOpen(false)}>
                    <FontAwesomeIcon icon={faXmark} />
                    &nbsp;Close
                </Button>
            }
        >
            <div className="flex flex-col items-start">
                <Button onClick={() => selectTrack('all')}>
                    All
                </Button>
                {
                    tracks.map(t => <Button key={'track-select-' + t.fileReference} onClick={() => selectTrack(t.fileReference)}>
                        <div className="max-w-80 truncate">
                            {t.name}
                        </div>
                    </Button>)
                }
            </div>
        </ModalBaseLayout>
    </>
}