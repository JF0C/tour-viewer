import { FunctionComponent } from "react";
import { useMap } from "react-leaflet";
import { setClickedEvent } from "../../store/mapStateReducer";
import { setReleasePosition, setTapPosition } from "../../store/mapStateReducer";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { mapClickEnd } from "../../store/stateHelpers";
import { Roles } from "../../constants/Rolenames";

export const LongTapMapLocationConverter: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const mapState = useAppSelector((state) => state.map);
    const selectedTracks = useAppSelector((state) => state.track.tracks.filter(t => t.selected) ?? []);
    const isContributor = useAppSelector((state) => state.auth.user?.roles.includes(Roles.Contributor) ?? false);
    const isEditingBlogPost = useAppSelector((state) => state.blog.editingBlogPost !== undefined);

    const map = useMap();

    if (mapState.tapPosition) {
        const bounds = map.getBounds();
        const latRatio = mapState.tapPosition.y / (window.innerHeight - 52);
        const lat = (1-latRatio) * bounds.getNorth() + latRatio * bounds.getSouth();
        const lngRatio = mapState.tapPosition.x / window.innerWidth;
        const lng = (1-lngRatio) * bounds.getWest() + lngRatio * bounds.getEast();
        dispatch(setTapPosition());
        dispatch(setClickedEvent({
            latitude: lat,
            longitude: lng
        }));
    }

    if (mapState.releasePosition) {
        dispatch(setReleasePosition());
        dispatch(setClickedEvent());
        mapClickEnd(dispatch, mapState, selectedTracks, isContributor, isEditingBlogPost);
    }
    return <></>
}