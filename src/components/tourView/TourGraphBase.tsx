import { Slider } from '@mui/material';
import * as d3 from 'd3';
import { FunctionComponent, useMemo, useRef, useState } from "react";
import { millisToTimeString } from '../../converters/dateConverters';
import { TrackPoint } from "../../data/trackPoint";

export type TourGraphBaseProps = {
    points: TrackPoint[],
    selector: (point: TrackPoint) => number
}

export const TourGraphBase: FunctionComponent<TourGraphBaseProps> = (props) => {
    const height = 300;
    const width = 400;
    const margin = 10;
    const marginLeft = 25;
    const marginBottom = 25;
    const sliderMax = 10000;
    const divRef = useRef<HTMLDivElement>(null);
    const [rerender, setRerender] = useState(true);
    const [scrollState, setScrollState] = useState(0);

    const svg = useMemo(() => {
        const svg = d3.create('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('viewBox', [0, 0, width, height])
            .attr('style', 'max-width: 100%; height: auto; height: intrinsic;');

        const allTimes = props.points.map(p => p.time);
        const allValues = props.points.map(p => props.selector(p));

        const size = allTimes.length;

        const windowSize = size / 20;

        const slideSize = size - windowSize;

        const slidePosition = slideSize * scrollState / sliderMax;

        const times: number[] = [];

        const values: number[] = [];

        for (let k = 0; k < size; k++) {
            if (k < slidePosition || k > slidePosition + windowSize) {
                continue;
            }
            times.push(allTimes[k]);
            values.push(allValues[k]);
        }

        const timeRange = [Math.min(...times), Math.max(...times)];

        const x = d3.scaleLinear(timeRange, [marginLeft, width - margin])

        const valueRange = [Math.min(...allValues), Math.max(...allValues)];

        const y = d3.scaleLinear(valueRange, [height - marginBottom, margin])

        const line = d3.line<{ time: number, value: number }>()
            .x(d => x(d.time))
            .y(d => y(d.value));

        const data = props.points.map(p => { return { time: p.time, value: props.selector(p) } })

        svg.append("g")
            .attr("transform", `translate(${marginLeft},0)`)
            .call(d3.axisLeft(y).ticks(height / 40))
            .call(g => g.select(".domain").remove())
            .call(g => g.selectAll(".tick line").clone()
                .attr("x2", width - marginLeft - margin)
                .attr("stroke-opacity", 0.1))
            .call(g => g.append("text")
                .attr("transform", `translate(0, -5)`)
                .attr("x", -marginLeft)
                .attr("y", 10)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text("km/h"));

        svg.append("g")
            .attr("transform", `translate(0,${height - marginBottom})`)
            .call(d3.axisBottom(x)
                .ticks(width / 80)
                .tickFormat(x => millisToTimeString(x.valueOf()))
                .tickSizeOuter(0));

        svg.append("path")
            .attr("fill", "none")
            .attr("stroke", "white")
            .attr("stroke-width", 1.5)
            .attr("d", line(data))
            .on('click', (e) => console.log(e));

        return svg.node();
    }, [props, scrollState])

    if (divRef.current) {
        divRef.current.replaceChildren(svg!);
    }

    if (rerender) {
        setTimeout(() => setRerender(false), 100)
    }

    return <div className='w-full p-2'>
        <div className='overflow-x-scroll w-full' ref={divRef}>
        </div>
        <Slider min={0} max={sliderMax} onChange={(e, v) => { typeof v === 'number' ? setScrollState(v) : setScrollState(v[0]) }} />
    </div>
}