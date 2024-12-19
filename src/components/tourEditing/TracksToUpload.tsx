import { faCloudUpload, faRotate, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { clearTracksToUpload, setEditingTour, setTracksToUpload } from "../../store/tourStateReducer";
import { loadTourRequest } from "../../store/tourThunk";
import { createTrackRequest } from "../../store/trackThunk";
import { AddTracksButton } from "./AddTracksButton";
import { UploadTrackItem } from "./UploadTrackItem";

export const TracksToUpload: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const tourId = useAppSelector((state) => state.tour.editingTour.id);
    const tracks = useAppSelector((state) => state.tour.editingTour.tracksToUpload);
    const enableUploadActions = tracks.every(t => t.state !== 'loading');
    const canUpload = tracks.length > 0
        && tracks.every(t => t.isValid)
        && enableUploadActions;
    const haveErrors = Boolean(tracks.find(t => t.state === 'error'));

    const clearUploads = () => {
        dispatch(clearTracksToUpload());
    }

    if (tracks.length > 0 && tracks.every(t => t.state === 'error' || t.state === 'finished')) {
        const failedTracks = tracks.filter(t => t.state === 'error');
        dispatch(loadTourRequest(tourId))
            .unwrap()
            .then((t) => {
                dispatch(setEditingTour(t));
                dispatch(setTracksToUpload(failedTracks));
            });

    }

    const startUploads = () => {
        console.log(tracks);
        for (let track of tracks) {
            dispatch(createTrackRequest({
                id: track.id,
                tourId: tourId,
                name: track.name,
                data: track.data,
                tourPosition: track.tourPosition
            }));
        }
    }

    return <>
        <tr>
            <td colSpan={4}>
                <div>
                    <AddTracksButton disabled={!enableUploadActions} />
                    <Button disabled={!enableUploadActions || tracks.length === 0} onClick={clearUploads} color='warning'>
                        <div className="flex flex-row items-center">
                            <FontAwesomeIcon icon={faXmarkCircle} />
                            <div className="hidden md:block">&nbsp;Clear</div>
                        </div>
                    </Button>
                    <Button disabled={!canUpload} onClick={startUploads} color='success'>
                        <div className="flex flex-row items-center">
                            {
                                haveErrors ?
                                <>
                                    <FontAwesomeIcon icon={faRotate} />
                                    <div className="hidden md:block">&nbsp;Retry</div>
                                </>
                                :
                                <>
                                    <FontAwesomeIcon icon={faCloudUpload} />
                                    <div className="hidden md:block">&nbsp;Upload</div>
                                </>
                            }
                            
                        </div>
                    </Button>
                </div>
            </td>
        </tr>
        {tracks.map(t => <UploadTrackItem key={'track-upload-item-' + t.id} track={t} />)}
    </>
}