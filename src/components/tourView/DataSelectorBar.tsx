import { faComment, faMap } from "@fortawesome/free-regular-svg-icons";
import { faChevronDown, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setDataBarState, setMapMode } from "../../store/viewStateReducer";
import { TourSelector } from "./TourSelector";
import { TrackSelector } from "./TrackSelector";


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

    const showBlogPosts = () => {
        dispatch(setMapMode('blogPosts'));
    }

    return <>
        <div id='data-selector-bar-content' className={`flex flex-row w-full absolute justify-center ${barState}`}>
            <div style={{ zIndex: 6000 }} className="selector-field rounded-md border-black flex flex-row flex-wrap">
                <div className={`${barState} flex flex-row flex-wrap`}>
                    {
                        viewState.mapMode === 'tours' ?
                            <div className="flex flex-row items-center">
                                <Button onClick={showBlogPosts} sx={{ minWidth: '40px' }}>
                                    <FontAwesomeIcon icon={faComment} />
                                </Button>
                                <FontAwesomeIcon icon={faEllipsisVertical}/>
                                <TourSelector title={tour?.name ?? 'Select Tour'} />
                                <TrackSelector />
                            </div>
                            :
                            <Button onClick={() => dispatch(setMapMode('tours'))} sx={{ minWidth: '40px' }}>
                                <FontAwesomeIcon icon={faMap} />
                            </Button>
                    }
                </div>
            </div>
        </div>
        <div id='data-selector-bar-handle' className={`flex flex-row w-full absolute justify-center ${barState}`}>
            <div onMouseEnter={expandBar} id='selector-bar-inner-handle' style={{ zIndex: 6000 }}
                className={`selector-field rounded-md border-black ${barState}`}>
                <Button sx={{ minWidth: '20px', minHeight: '10px' }} onClick={expandBar}>
                    <FontAwesomeIcon icon={faChevronDown} />
                </Button>
            </div>
        </div>
    </>
}