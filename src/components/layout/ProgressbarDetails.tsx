import { FunctionComponent } from "react";
import { ProgressbarParams } from "../../data/progressbarParams";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { faLock, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setProgressDetails } from "../../store/viewStateReducer";
import { selectMarkerReference, selectTracks, setTargetCoordinates } from "../../store/trackStateReducer";
import { setMarkerReferenceId } from "../../store/mapStateReducer";

export type ProgressbarDetailsProps = {
    data: ProgressbarParams
}

export const ProgressbarDetails: FunctionComponent<ProgressbarDetailsProps> = (props) => {
    const dispatch = useAppDispatch();
    const progressDetails = useAppSelector((state) => state.view.progressDetails);
    const tourState = useAppSelector((state) => state.tour);
    const trackState = useAppSelector((state) => state.track);
    const selectedTour = tourState.selectedTour;
    const tracks = trackState.tracks;

    if (selectedTour === undefined || tracks.find(t => t.loading) || trackState.loading || tourState.loading) {
        return <></>
    }

    const toKm = (meters: number) => {
        return (meters / 1000).toFixed(0);
    }

    const positionText = (props.data.length > 0 ?
        props.data.type === 'tour' ? toKm(props.data.length) :
            `${toKm(props.data.start)}-${toKm(props.data.start + props.data.length)}` :
        toKm(props.data.start));

    let nextElement: (() => void) | undefined = undefined;
    let prevElement: (() => void) | undefined = undefined;

    if (props.data.type === 'track') {
        const sortedTracks = [...tracks].sort((a, b) => a.tourPosition - b.tourPosition);
        for (let k = 0; k < sortedTracks.length; k ++) {
            const st = sortedTracks[k];
            if (st.id === tracks.find(t => t.selected)?.id) {
                if (k > 0) {
                    prevElement = () => {
                        dispatch(selectTracks([sortedTracks[k-1].fileReference]));
                    };
                }
                if (k < sortedTracks.length - 1) {
                    nextElement = () => {
                        dispatch(selectTracks([sortedTracks[k+1].fileReference]));
                    };
                }
            }
        }
    }

    if (props.data.type === 'marker') {
        for (let k = 0; k < trackState.markerReferences.length; k++) {
            const markerReference = trackState.markerReferences[k];
            if (markerReference.selected) {
                if (k > 0) {
                    const prevMarker = trackState.markerReferences[k-1];
                    prevElement = () => {
                        dispatch(setMarkerReferenceId(prevMarker));
                        dispatch(setTargetCoordinates(prevMarker.coordinates));
                        setTimeout(() => {
                            dispatch(selectMarkerReference(prevMarker));
                        }, 50);
                    }
                }
                if (k < trackState.markerReferences.length - 1) {
                    const nextMarker = trackState.markerReferences[k+1];
                    nextElement = () => {
                        dispatch(setMarkerReferenceId(nextMarker));
                        dispatch(setTargetCoordinates(nextMarker.coordinates));
                        setTimeout(() => {
                            dispatch(selectMarkerReference(nextMarker));
                        }, 50);
                    }
                }
            }
        }
    }

    return <div className={`progress-bar-details rounded-md p-2 ${progressDetails ? 'border-2' : ''}`}>
        {
            progressDetails ?
                <div className="w-full flex flex-row justify-center relative h-2">
                    <div className="absolute" style={{ top: '-10px' }}>
                        <FontAwesomeIcon size='xs' icon={faLock} />
                    </div>
                </div>
                : <></>
        }
        <div className="flex flex-row items-center gap-2">
            <div onClick={prevElement} className={`cursor-pointer ${!prevElement ? 'hidden' : ''}`}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </div>
            <div className="flex flex-col" onClick={() => dispatch(setProgressDetails(!progressDetails))}>
                <div>{props.data.title}</div>
                <div>{positionText}&nbsp;km</div>
            </div>
            <div onClick={nextElement} className={`cursor-pointer ${!nextElement ? 'hidden' : ''}`}>
                <FontAwesomeIcon icon={faChevronRight} />
            </div>
        </div>
    </div>
}