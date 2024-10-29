import { Polygon, useMap } from "react-leaflet"
import { useAppSelector } from "../../store/store"
import { LatLng } from "leaflet";
import { Timeouts } from "../../constants/Timeouts";
import { useState } from "react";
import { Roles } from "../../constants/Rolenames";

export const SecondaryClickCountdown = () => {
    const position = useAppSelector((state) => state.blog.clickedEvent.location);
    const clickedTime = useAppSelector((state) => state.blog.clickedEvent.time);
    const user = useAppSelector((state) => state.auth.user);
    const tour = useAppSelector((state) => state.tour.selectedTour);
    const map = useMap();

    const [points, setPoints] = useState<LatLng[]>([]);
    const [running, setRunning] = useState(false);

    const isAllowedToEdit = Boolean(tour?.participants.find(p => p.id === user?.id)) 
        || Boolean(user?.roles.includes(Roles.Admin));

    if (!position || !isAllowedToEdit) {
        if (points.length > 0) {
            setPoints([]);
        }
        if (running) {
            setRunning(false);
        }
        return <></>
    }

    const lat = position.latitude;
    const lon = position.longitude;
    const mapBounds = map.getBounds();
    const [south, west, north, east] = [mapBounds.getSouth(), mapBounds.getWest(), mapBounds.getNorth(), mapBounds.getEast()];
    const vertical = north > south ? north - south : south - north;
    const horizontal = east > west ? east - west : west - east;
    const radius = 0.05 * Math.min(vertical, horizontal);

    const renderCircleSegment = (progress: number) => {
        const result: LatLng[] = [new LatLng(lat, lon)];
        for (let k = 0; k < 1000 * progress; k++) {
            const skewCorrection = 1 / Math.max(Math.cos(Math.abs(lat)/180*Math.PI), 0.001);
            
            result.push(new LatLng(lat + Math.cos(k / 500 * Math.PI) * radius,
                (lon + Math.sin(k / 500 * Math.PI) * radius * skewCorrection)));
        }
        result.push(new LatLng(lat, lon));
        setPoints(result);
    }

    const timeStep = (): boolean => {
        const progress = Math.min((new Date().valueOf() - clickedTime) / Timeouts.CreateBlogPostHold, 1.0);
        if (progress > 0.25) {
            renderCircleSegment(progress);
        }
        if (progress >= 1.0) {
            return false;
        }
        return true;
    }

    const loopMethod = (cont: boolean) => {
        if (cont) {
            setTimeout(() => {
                loopMethod(timeStep() && running);
            }, 10);
        }
        else {
            setRunning(false);
        }
    }

    if (!running) {
        setRunning(true);
        loopMethod(true);
    }

    return <Polygon positions={points}>
    </Polygon>
}