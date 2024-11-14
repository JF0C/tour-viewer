import * as d3 from 'd3';
import { FunctionComponent, useMemo, useRef, useState } from "react";
import { TrackPoint } from "../../data/trackPoint";

export type TourGraphBaseProps = {
    points: TrackPoint[],
    selector: (point: TrackPoint) => number
}

export const TourGraphBase: FunctionComponent<TourGraphBaseProps> = (props) => {
    const height = 300;
    const width = 400;
    const margin = 10;
    const divRef = useRef<HTMLDivElement>(null);
    const [rerender, setRerender] = useState(true);

    const svg = useMemo(() => {
        const svg = d3.create('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('viewBox', [0, 0, width, height])
            .attr('style', 'max-width: 100%; height: auto; height: intrinsic;');

        const times = props.points.map(p => p.time);
        const values = props.points.map(p => props.selector(p));

        console.log(times.length);

        const timeRange = [Math.min(...times), Math.max(...times)];

        const x = d3.scaleLinear(timeRange, [margin, width - margin])

        const valueRange = [Math.min(...values), Math.max(...values)];

        const y = d3.scaleLinear(valueRange, [height - margin, margin])

        const line = d3.line<{ time: number, value: number }>()
            .x(d => x(d.time))
            .y(d => y(d.value));

        const data = props.points.map(p => { return { time: p.time, value: props.selector(p) } })

        svg.append("path")
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", 1.5)
            .attr("d", line(data));

        return svg.node();
    }, [props])

    if (divRef.current) {
        divRef.current.replaceChildren(svg!);
    }
    
    if (rerender) {
        setTimeout(() => setRerender(false), 100)
    }

    return <div ref={divRef}>
        test
    </div>
}