import { FunctionComponent, useState } from "react";
import { ProgressbarParams } from "../../data/progressbarParams";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronLeft, faChevronRight, faLock } from "@fortawesome/free-solid-svg-icons";
import { setProgressDetails } from "../../store/viewStateReducer";

export type ProgressbarActiveSectionProps = {
    data: ProgressbarParams;
}

export const ProgressbarActiveSection: FunctionComponent<ProgressbarActiveSectionProps> = (props) => {
    const dispatch = useAppDispatch();
    const [leftState, setLeftState] = useState(74);
    const progressDetails = useAppSelector((state) => state.view.progressDetails);
    const [showDetails, setShowDetails] = useState(progressDetails);
    const tourState = useAppSelector((state) => state.tour);
    const trackState = useAppSelector((state) => state.track);

    if (tourState.loading || trackState.loading) {
        return <></>
    }

    var left = props.data.start / props.data.totalDistance * 100;
    const minWidth = (window.innerWidth < 768) ? 5 : 1;
    if (props.data.length === 0) {
        left -= (minWidth / 2);
    }


    if (progressDetails && !showDetails) {
        setShowDetails(true);
    }

    if (left !== leftState) {
        setLeftState(left);
        setShowDetails(true);
        setTimeout(() => setShowDetails(progressDetails ?? false), 5000)
    }

    const width = Math.max(minWidth, props.data.length / props.data.totalDistance * 100);

    const toKm = (meters: number) => {
        return (meters / 1000).toFixed(0)
    }

    const positionText = (props.data.length > 0 ?
        `${toKm(props.data.start)}-${toKm(props.data.start + props.data.length)}` :
        toKm(props.data.start));

    return <>
        <div className="relative h-1 progress-bar-active-section" style={{
            left: `${left.toFixed(2)}%`,
            width: `${width.toFixed(2)}%`
        }}>
            <div className="absolute w-full flex flex-row justify-center transition-all"
                style={{
                    top: showDetails ? '-250px' : '8px'
                }}
            >
                <div className="bg-primary-half rounded-md px-2 flex flex-row gap-2">
                    <div className="cursor-pointer">
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </div>
                    <div className="cursor-pointer" onClick={() => setShowDetails(true)}>
                        <FontAwesomeIcon icon={faChevronDown} />
                    </div>
                    <div className="cursor-pointer">
                        <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                </div>
            </div>
        </div>
        <div className="relative progress-bar-details-anchor flex flex-row justify-center" style={{
            left: `min(max(75px, ${(left + width / 2).toFixed(2)}%), calc(100vw - 75px))`,
            top: showDetails ? '8px' : '-250px',
            width: 0
        }} onClick={() => dispatch(setProgressDetails(!progressDetails))}>
            <div className={`progress-bar-details rounded-md p-2 ${progressDetails ? 'border-2' : ''}`}>
                {
                    progressDetails ?
                        <div className="w-full flex flex-row justify-center relative h-2">
                            <div className="absolute" style={{ top: '-10px' }}>
                                <FontAwesomeIcon size='xs' icon={faLock} />
                            </div>
                        </div>
                        : <></>
                }
                <div>{props.data.title}</div>
                <div>{positionText}&nbsp;km</div>
            </div>
        </div>
    </>
}