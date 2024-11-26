import { StravaActivityDetailDto } from "../dtos/strava/stravaActivityDetailDto";
import { StravaActivityDetailRequestDto } from "../dtos/strava/stravaActivityDetailRequestDto";

type GpxPoint = { lat: number, lon: number, ele: number, time: number }

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

    const result = `<?xml version="1.0" encoding="UTF-8"?>
<gpx xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd" creator="TourViewer" version="1.1" xmlns="http://www.topografix.com/GPX/1/1">
  <metadata>
    <name>${metadata.name}</name>
      <time>${new Date(metadata.start_date).toISOString()}</time>
  </metadata>
  <trk>
    <name>${metadata.name}</name>
    <type>cycling</type>
    <trkseg>
        ${points.map(p => `<trkpt lat="${p.lat}" lon="${p.lon}">
<ele>${p.ele}</ele>
<time>${new Date(p.time).toISOString()}</time>
</trkpt>`)}
    </trkseg>
  </trk>
</gpx>`

    return result;
}