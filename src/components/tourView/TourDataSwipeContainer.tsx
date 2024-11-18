import { FunctionComponent } from "react";
import SwipeableViews from "react-swipeable-views";
import { bindKeyboard } from "react-swipeable-views-utils";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { selectTracks } from "../../store/trackStateReducer";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { TourData } from "./TourData";
import { LoadingSpinner } from "../shared/LoadingSpinner";

export const TourDataSwipeContainer: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const tracks = useAppSelector((state) => state.track.tracks);
    const selectedTracks = tracks.filter(t => t.selected);

    const selectTrack = (index: number) => {
        dispatch(selectTracks([tracks[index].fileReference]));
    }
    let currentIndex = -1;
    if (selectedTracks.length === 1) {
        const id = selectedTracks[0].fileReference;
        let num = 0;
        for (let t of tracks) {
            if (t.fileReference === id) {
                break;
            }
            num++;
        }
        currentIndex = num;
    }
    else {
        return <TourData />
    }
    const hasNextTrack = currentIndex < tracks.length - 1;
    const hasPrevTrack = currentIndex > 0;

    const content = [];
    if (hasPrevTrack) {
        content.push(<div key='tourdata-prev'>
            <LoadingSpinner />
        </div>)
    }
    content.push(<TourData key='tourdata-current' />)
    if (hasNextTrack) {
        content.push(<div key='tourdata-next'>
            <LoadingSpinner />
        </div>)
    }

    const KeyboardSwipeable = bindKeyboard(SwipeableViews);
    return <div className="info-bar-content">
        <KeyboardSwipeable onChangeIndex={e => selectTrack(currentIndex - (hasPrevTrack ? 1 : 0) + e)}
            index={hasPrevTrack ? 1 : 0} enableMouseEvents className="w-full">
            {
                content
            }
        </KeyboardSwipeable>
        
        <div className='flex flex-row justify-between absolute bottom-0 w-full'>
            <Button disabled={!hasPrevTrack} onClick={() => selectTrack(currentIndex - 1)}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </Button>
            <Button disabled={!hasNextTrack} onClick={() => selectTrack(currentIndex + 1)}>
                <FontAwesomeIcon icon={faChevronRight} />
            </Button>
        </div>
    </div>
}