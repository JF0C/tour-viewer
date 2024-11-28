import { GpxPoint } from "../data/gpxPoint";

export const gpxFromPoints = (points: GpxPoint[], name: string, startDate: number) => {
    return `<?xml version="1.0" encoding="UTF-8"?>
<gpx xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd" creator="TourViewer" version="1.1" xmlns="http://www.topografix.com/GPX/1/1">
  <metadata>
    <name>${name}</name>
      <time>${new Date(startDate).toISOString()}</time>
  </metadata>
  <trk>
    <name>${name}</name>
    <type>cycling</type>
    <trkseg>
        ${points.map(p => `<trkpt lat="${p.lat}" lon="${p.lon}">
<ele>${p.ele}</ele>
<time>${new Date(p.time).toISOString()}</time>
</trkpt>`)}
    </trkseg>
  </trk>
</gpx>`
}