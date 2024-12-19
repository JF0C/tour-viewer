import { FunctionComponent } from "react";
import { ProgressbarParams } from "../../data/progressbarParams";

export type ProgressbarActiveSectionProps = {
    data: ProgressbarParams;
    showDetails?: boolean;
}

export const ProgressbarActiveSection: FunctionComponent<ProgressbarActiveSectionProps> = (props) => {
    var left = props.data.start / props.data.totalDistance * 100;
    if (props.data.length === 0) {
        left -= .5;
    }
    const width = Math.max(1, props.data.length / props.data.totalDistance * 100);

    const toKm = (meters: number) => {
        return (meters / 1000).toFixed(1) + "km"
    }

    const positionText = (props.data.length > 0 ? 
        `${toKm(props.data.start)} to ${toKm(props.data.start + props.data.length)}` :
        toKm(props.data.start)) + ` of ${toKm(props.data.totalDistance)}`;

    return <div className="relative h-1 progress-bar-active-section flex flex-row justify-center" style={{
        left: `${left.toFixed(2)}%`,
        width: `${width.toFixed(2)}%`
    }}>
        {
            props.showDetails ? 
            <div className="absolute progress-bar-details rounded-md p-2">
                <div>{props.data.title}</div>
                <div>{positionText}</div>
            </div>
            :<></>
        }
    </div>
}