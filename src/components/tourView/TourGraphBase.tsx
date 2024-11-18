import { FormControl, InputLabel, MenuItem, Select, Slider } from '@mui/material';
import * as d3 from 'd3';
import { FunctionComponent, useMemo, useRef, useState } from "react";
import { movingAverage, savGol } from '../../converters/dataFilters';
import { millisToTimeString } from '../../converters/dateConverters';
import { TrackPoint } from "../../data/trackPoint";
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setDataPointLocation } from '../../store/trackStateReducer';
import { CoordinatesDto } from '../../dtos/coordinatesDto';

export type TourGraphBaseProps = {
    points: TrackPoint[],
    selector: (point: TrackPoint) => number
}

export const TourGraphBase: FunctionComponent<TourGraphBaseProps> = (props) => {
    const dispatch = useAppDispatch();
    const dataPointLocation = useAppSelector((state) => state.track.dataPointLocation);
    const height = 300;
    const width = 400;
    const margin = 10;
    const marginLeft = 25;
    const marginBottom = 25;
    const sliderMax = 10000;
    const divRef = useRef<HTMLDivElement>(null);
    const dataZoomLevels = [1, 10, 20, 50];
    type filterNames = 'savgol' | 'avg 50';
    const filters = ['savgol', 'avg 50'];

    const [rerender, setRerender] = useState(true);
    const [scrollState, setScrollState] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [dataZoom, setDataZoom] = useState<number>(20);
    const [filter, setFilter] = useState<filterNames>('avg 50');

    const [svg, windowSize, slidePosition] = useMemo(() => {
        const svg = d3.create('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('viewBox', [0, 0, width, height])
            .attr('style', 'max-width: 100%; height: auto; height: intrinsic;');

        const allTimes = props.points.map(p => p.time);
        const allValuesUnfiltered = props.points.map(p => props.selector(p));
        const allValues = filter === 'savgol' ? savGol(allValuesUnfiltered) :
            filter === 'avg 50' ? movingAverage(allValuesUnfiltered, { windowSize: 50 })
                : allValuesUnfiltered;
        // const allValues = savGol(allValuesUnfiltered);

        const size = allTimes.length;

        const windowSize = size / dataZoom;

        const slideSize = size - windowSize;

        const slidePosition = Math.floor(slideSize * scrollState / sliderMax);

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

        const valueRange = [Math.min(...allValues, 0), Math.max(...allValues)];

        const y = d3.scaleLinear(valueRange, [height - marginBottom, margin])

        const line = d3.line<{ time: number, value: number }>()
            .x(d => x(d.time))
            .y(d => y(d.value));

        let data = props.points.map(p => { return { time: p.time, value: props.selector(p) } })

        data = times.map((t, i) => { return { time: t, value: values[i] } })
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
            .attr("stroke", "#1976d2")
            .attr("stroke-width", 1.5)
            .attr("d", line(data));

        if (values[selectedIndex]) {
            const selectedTime = times[selectedIndex];
            const selectedValue = values[selectedIndex];
            const selectedPoint = [x(selectedTime), y(selectedValue)]
            const lastValue = x(times[times.length - 1]);

            svg.append('circle')
                .attr('id', 'selected-point')
                .attr('r', 5)
                .attr('fill', 'red')
                .attr('cx', selectedPoint[0])
                .attr('cy', selectedPoint[1]);

            const textWidth = 70;
            const textLeft = lastValue - selectedPoint[0] < textWidth ? textWidth : 0;

            svg.append('text')
                .attr('x', selectedPoint[0] - textLeft)
                .attr('y', selectedPoint[1] - 30)
                .attr('fill', 'white')
                .text(millisToTimeString(selectedTime));

            svg.append('text')
                .attr('x', selectedPoint[0] - textLeft)
                .attr('y', selectedPoint[1] - 15)
                .attr('fill', 'white')
                .text(`${selectedValue.toFixed(1)} km/h`)

            svg.append('text')
                .attr('x', selectedPoint[0] - textLeft)
                .attr('y', selectedPoint[1] - 15)
                .attr('fill', 'white')
                .text(`${selectedValue.toFixed(1)} km/h`)
        }

        return [svg.node(), windowSize, slidePosition];
    }, [props, scrollState, selectedIndex, dataZoom, filter])

    const setDataMarkerPosition = (coordinates: CoordinatesDto) => {
        if (dataPointLocation?.latitude !== coordinates.latitude
            || dataPointLocation?.longitude !== coordinates.longitude) {
            dispatch(setDataPointLocation(coordinates));
        }
    }

    const selectedIndexChange = (index: number) => {
        setSelectedIndex(index);
        const point = props.points[slidePosition + index];

        setDataMarkerPosition({
            latitude: point.latitude,
            longitude: point.longitude
        });
    }

    const scrollStateChange = (scroll: number) => {
        setScrollState(scroll);
        const slideSize = props.points.length - windowSize;
        const sliderPosition = Math.floor(scroll / sliderMax * slideSize);
        const point = props.points[sliderPosition + selectedIndex];

        setDataMarkerPosition({
            latitude: point.latitude,
            longitude: point.longitude
        });
    }

    if (divRef.current) {
        divRef.current.replaceChildren(svg!);
    }

    if (rerender) {
        setTimeout(() => setRerender(false), 100)
    }

    return <div className='w-full p-2'>
        <div className='flex flex-row gap-2'>
            <FormControl fullWidth>
                <InputLabel id='data-zoom-label'>
                    Zoom
                </InputLabel>
                <Select defaultValue={20} size='small' label='Zoom' labelId='data-zoom-level'
                    sx={{ color: 'white' }}
                    onChange={(e) => setDataZoom(Number(e.target.value))}>
                    {
                        dataZoomLevels.map(z => <MenuItem key={z} value={z}>{z}x</MenuItem>)
                    }
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id='filter-selector-label'>
                    Filter
                </InputLabel>
                <Select defaultValue={'avg 50'} size='small' label='Filter' labelId='filter-selector-label' sx={{ color: 'white' }}
                    onChange={(e) => setFilter(e.target.value as filterNames)}>
                    {
                        filters.map(f => <MenuItem key={f} value={f}>{f}</MenuItem>)
                    }
                </Select>
            </FormControl>

        </div>
        <Slider min={0} max={windowSize} onChange={(_e, v) => {
            typeof v === 'number' ? selectedIndexChange(v) : selectedIndexChange(v[0])
        }} />
        <div className='overflow-x-scroll w-full' ref={divRef}>
        </div>
        <Slider min={0} max={sliderMax} onChange={(_e, v) => {
            typeof v === 'number' ? scrollStateChange(v) : scrollStateChange(v[0])
        }} />
    </div>
}