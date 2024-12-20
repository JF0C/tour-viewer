import { FunctionComponent, useState } from "react";
import { ProgressbarParams } from "../../data/progressbarParams";
import { useAppSelector } from "../../store/store";

export type ProgressbarActiveSectionProps = {
    data: ProgressbarParams;
    showDetails?: boolean;
}

export const ProgressbarActiveSection: FunctionComponent<ProgressbarActiveSectionProps> = (props) => {
    const [leftState, setLeftState] = useState(74);
    const [showDetails, setShowDetails] = useState(props.showDetails ?? false);
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


    if (props.showDetails && !showDetails) {
        setShowDetails(true);
    }

    if (left !== leftState) {
        setLeftState(left);
        setShowDetails(true);
        setTimeout(() => setShowDetails(props.showDetails ?? false), 5000)
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
        </div>
        <div className={`relative progress-bar-details-anchor flex flex-row justify-center ${showDetails ? '' : 'opacity-0'}`} style={{
            left: `min(max(75px, ${(left + width/2).toFixed(2)}%), calc(100vw - 75px))`,
            width: 0
        }} onClick={() => setShowDetails(false)}>
            <div className="progress-bar-details rounded-md p-2">
                <div>{props.data.title}</div>
                <div>{positionText}&nbsp;km</div>
            </div>
        </div>
    </>
}