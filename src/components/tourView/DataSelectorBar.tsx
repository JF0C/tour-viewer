import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { TourSelector } from "./TourSelector";
import { TrackSelector } from "./TrackSelector";
import { Button } from "@mui/material";
import { setDataBarState, setMapMode } from "../../store/viewStateReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faComment, faMap } from "@fortawesome/free-regular-svg-icons";


export const TourSelectorBar: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const tour = useAppSelector((state) => state.tour.selectedTour);
    const viewState = useAppSelector((state) => state.view);
    const barState = viewState.dataSelectorBarState;

    if (barState === 'hide') {
        return <></>
    }

    const expandBar = () => {
        dispatch(setDataBarState('show'));
    }

    return <>
        <div id='data-selector-bar-content' className={`flex flex-row w-full absolute justify-center ${barState}`}>
            <div style={{ zIndex: 1000 }} className="selector-field rounded-md border-black flex flex-row flex-wrap">
                <div className={`${barState} flex flex-row flex-wrap`}>
                    {
                        viewState.mapMode === 'tours' ?
                            <>
                                <Button onClick={() => dispatch(setMapMode('blogPosts'))} sx={{ minWidth: '40px' }}>
                                    <FontAwesomeIcon icon={faComment} />
                                </Button>
                                <TourSelector title={tour?.name ?? 'Select Tour'} onSelected={() => { }} />
                                <TrackSelector />
                            </>
                            :
                            <Button onClick={() => dispatch(setMapMode('tours'))} sx={{ minWidth: '40px' }}>
                                <FontAwesomeIcon icon={faMap} />
                            </Button>
                    }
                </div>
            </div>
        </div>
        <div id='data-selector-bar-handle' className={`flex flex-row w-full absolute justify-center ${barState}`}>
            <div onMouseEnter={expandBar} id='selector-bar-inner-handle' style={{ zIndex: 1000 }}
                className={`selector-field rounded-md border-black ${barState}`}>
                <Button sx={{ minWidth: '20px', minHeight: '10px' }} onClick={expandBar}>
                    <FontAwesomeIcon icon={faChevronDown} />
                </Button>
            </div>
        </div>
    </>
}