import { faChevronRight, faInfo, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, MenuItem, Select } from "@mui/material";
import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { showInfobar } from "../../store/tourStateReducer";
import { selectTracks } from "../../store/trackStateReducer";

export const TrackSelector: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const tracks = useAppSelector((state) => state.tour.selectedTour?.tracks);
    const infoOpen = useAppSelector((state) => state.tour.showInfoBar);

    if (!tracks) {
        return <></>
    }

    const selectTrack = (fileReference: string) => {
        if (fileReference === 'all') {
            dispatch(selectTracks(tracks.map(t => t.fileReference)))
        }
        else {
            dispatch(selectTracks([fileReference]));
        }
    }

    return <div className="track-selector flex flex-row items-center">
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
        <FontAwesomeIcon icon={faChevronRight} />
        <Button sx={{minWidth: '25px'}} onClick={() => dispatch(showInfobar(!infoOpen))}>
            {
                infoOpen ?
                    <FontAwesomeIcon icon={faInfoCircle} />
                    :
                    <FontAwesomeIcon icon={faInfo} />
            }
        </Button>

    </div>
}