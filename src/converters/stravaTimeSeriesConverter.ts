import { GpxPoint } from "../data/gpxPoint";
import { StravaActivityDetailDto } from "../dtos/strava/stravaActivityDetailDto";
import { StravaActivityDetailRequestDto } from "../dtos/strava/stravaActivityDetailRequestDto";
import { gpxFromPoints } from "./gpxFromPoints";

export const stravaTimeSeriesToGpx = (input: StravaActivityDetailDto, metadata: StravaActivityDetailRequestDto): string => {
    const points: GpxPoint[] = new Array<GpxPoint>(input[0].data.length);

    for (let k = 0; k < input[0].data.length; k ++) {
        points[k] = {
            lat: input[0].data[k][0],
            lon: input[0].data[k][1],
            ele: input[2].data[k],
            time: metadata.start_date + input[3].data[k]
        }
    }

    return gpxFromPoints(points, metadata.name, metadata.start_date);
}