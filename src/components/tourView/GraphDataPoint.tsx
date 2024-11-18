import { FunctionComponent } from "react";
import { useAppSelector } from "../../store/store";
import { Circle } from "react-leaflet";

export const GraphDataPoint: FunctionComponent = () => {
    const infobarOpen = useAppSelector((state) => state.tour.showInfoBar);
    const coordinates = useAppSelector((state) => state.track.dataPointLocation);
    const zoomLevel = useAppSelector((state) => state.blog.zoomLevel);

    if (!infobarOpen || !coordinates) {
        return <></>
    }

    const radiusFromZoom = (zoomLevel: number) => {
        if (zoomLevel === 18) return 20;
        if (zoomLevel === 17) return 30;
        if (zoomLevel === 16) return 40;
        if (zoomLevel === 15) return 50;
        if (zoomLevel === 14) return 60;
        if (zoomLevel === 13) return 100;
        if (zoomLevel === 12) return 150;
        if (zoomLevel === 11) return 400;
        if (zoomLevel === 10) return 500;
        if (zoomLevel === 9) return 1000;
        if (zoomLevel === 8) return 2000;
        if (zoomLevel === 7) return 4000;
        if (zoomLevel === 6) return 8000;
        if (zoomLevel === 5) return 8000;
        if (zoomLevel === 4) return 8000;
        if (zoomLevel === 3) return 8000;
        if (zoomLevel === 2) return 8000;
        return 500;
    }

    console.log(zoomLevel)


    return <div className="graph-data-point">
        <Circle center={[coordinates.latitude, coordinates.longitude]}
            stroke
            color="red"
            fillColor="red"
            radius={radiusFromZoom(zoomLevel)} />
    </div>
}