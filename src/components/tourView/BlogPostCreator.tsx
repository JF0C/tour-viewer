import { LatLng } from "leaflet";
import { FunctionComponent, useState } from "react";
import { Marker, useMapEvents } from "react-leaflet";
import { MarkerIcons } from "../../constants/MarkerIcons";
import { Roles } from "../../constants/Rolenames";
import { useAppSelector } from "../../store/store";

export const BlogPostCreator: FunctionComponent = () => {
    const isContributor = useAppSelector((state) => state.auth.user?.roles.includes(Roles.Contributor))
    const [clickedTime, setClickedTime] = useState<Date | null>(null)
    const [clickedLocation, setClickedLocation] = useState<LatLng | null>(null)
    const [isCreatingBlogpost, setIsCreatingBlogpost] = useState(false)

    useMapEvents({
        mousedown(e) {
            setClickedTime(new Date())
            setClickedLocation(e.latlng)
        },
        mouseup() {
            const timeDelta = new Date().valueOf() - (clickedTime?.valueOf() ?? new Date().valueOf());
            if (timeDelta > 1000 && isContributor) {
                console.log('create new blogpost at ' + clickedLocation?.lat + ', ' + clickedLocation?.lng);
                setIsCreatingBlogpost(true);
            }
        }
    });

    if (isCreatingBlogpost && clickedLocation) {
        return <Marker icon={MarkerIcons.orange} draggable position={clickedLocation}>
            
        </Marker>
    }
    return <></>
}