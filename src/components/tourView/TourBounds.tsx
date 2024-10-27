import { FunctionComponent } from "react";
import { useMap } from "react-leaflet";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setBoundsSet } from "../../store/trackStateReducer";
import { LatLng, LatLngBounds } from "leaflet";
import { Layers } from "../../constants/Layers";


export const TourBounds: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const trackState = useAppSelector((state) => state.track);
    const map = useMap();

    if (trackState.loading) {
        map.eachLayer(l => {
            if (l.options.attribution === Layers.RoutesLayer)
            l.removeFrom(map)
        });
    }

    if (!trackState.boundsSet) {
        console.log('set bounds set');
        dispatch(setBoundsSet());
        const bounds = trackState.tracks.find(t => t.selected)?.bounds;
        let south = bounds?.south;
        let north = bounds?.north;
        let west = bounds?.west;
        let east = bounds?.east;
        if (bounds) {
            for (let t of trackState.tracks.filter(t => t.selected)) {
                if (t.bounds) {
                    if (t.bounds.south < bounds.south) {
                        south = t.bounds.south;
                    }
                    if (t.bounds.west < bounds.west) {
                        west = t.bounds.west;
                    }
                    if (t.bounds.north > bounds.north) {
                        north = t.bounds.north;
                    }
                    if (t.bounds.east > bounds.east) {
                        east = t.bounds.east;
                    }
                }
            }
            const maxBounds = new LatLngBounds(
                new LatLng(north ?? 0, east ?? 0),
                new LatLng(south ?? 0, west ?? 0)
            );
            map.fitBounds(maxBounds);
        }
    }
    return <></>
}