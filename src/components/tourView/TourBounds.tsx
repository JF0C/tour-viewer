import { FunctionComponent } from "react";
import { useMap } from "react-leaflet";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setBoundsSet } from "../../store/trackStateReducer";
import { LatLng, LatLngBounds } from "leaflet";


export const TourBounds: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const trackState = useAppSelector((state) => state.track);
    const map = useMap();

    console.log('bounds set: ' + trackState.boundsSet);
    
    if (!trackState.boundsSet) {
        console.log('set bounds set');
        dispatch(setBoundsSet());
        const bounds = trackState.tracks.find(t => t.selected)?.bounds;
        if (bounds) {
            for (let t of trackState.tracks.filter(t => t.selected)) {
                if (t.bounds) {
                    if (t.bounds.south < bounds.south) {
                        bounds.south = t.bounds.south;
                    }
                    if (t.bounds.west < bounds.west) {
                        bounds.west = t.bounds.west;
                    }
                    if (t.bounds.north > bounds.north) {
                        bounds.north = t.bounds.north;
                    }
                    if (t.bounds.east > bounds.east) {
                        bounds.east = t.bounds.east;
                    }
                }
            }
            const maxBounds = new LatLngBounds(
                new LatLng(bounds.north, bounds.east),
                new LatLng(bounds.south, bounds.west)
            );
            map.fitBounds(maxBounds);
        }
    }
    return <></>
}