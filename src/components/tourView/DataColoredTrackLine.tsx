import { FunctionComponent, ReactNode, useMemo, useState } from "react";
import { Polyline } from "react-leaflet";
import { Color } from "../../data/color";
import { TrackEntity } from "../../data/trackEntity";
import { useAppSelector } from "../../store/store";

export type DataColoredTrackLineProps = {
    track: TrackEntity
}

export const DataColoredTrackLine: FunctionComponent<DataColoredTrackLineProps> = (props) => {
    const dataState = useAppSelector((state) => state.track.graphData);
    const [rerender, setRerender] = useState(false);

    const memoizedLines = useMemo(() => {
        const lines: ReactNode[] = [];
        const mixColor = (c1: Color, c2: Color, f: number): Color => {
            return {
                r: c1.r * (1 - f) + c2.r * f,
                g: c1.g * (1 - f) + c2.g * f,
                b: c1.b * (1 - f) + c2.b * f
            }
        }

        const points = props.track.data.pointsTenth;
    
        for (let k = 0; k < points.length - 1; k ++) {
            const point = points[k];
            const nextPoint = points[k + 1];
            const value = point[dataState.selectedValue ?? 'velocity'];
            var normalized = (value - dataState.min) / (dataState.max - dataState.min);
            normalized = Math.max(Math.min(1.0, normalized), 0);
            const color = mixColor(dataState.minColor, dataState.maxColor, normalized);
            lines.push(
                <Polyline key={`dp-${k}`} positions={
                    [[point.latitude, point.longitude],
                    [nextPoint.latitude, nextPoint.longitude]]
                }
                color={`rgb(${color.r},${color.g},${color.b})`}
                />
            )
        }
        setRerender(true);
        return lines;
    }, [props.track.data.pointsTenth,
        dataState.selectedValue,
        dataState.max,
        dataState.min,
        dataState.minColor,
        dataState.maxColor]
    );

    
    if (rerender) {
        setTimeout(() => setRerender(false), 100)
    }

    if (rerender) {
        return <></>
    }

    return <> {memoizedLines} </>
}