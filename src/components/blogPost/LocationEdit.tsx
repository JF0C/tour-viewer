import { faCheck, faLocation, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { FunctionComponent } from "react";
import { resetCoordinatesChanged, setMarkerPosition } from "../../store/blogPostStateReducer";
import { changeBlogPostLocationRequest } from "../../store/blogPostThunk";
import { useAppDispatch, useAppSelector } from "../../store/store";

export const LocationEdit: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const blogPost = useAppSelector((state) => state.blog.editingBlogPost);
    const coordinatesChanged = useAppSelector((state) => state.blog.coordinatesChanged);
    const mapCenter = useAppSelector((state) => state.blog.mapCenter);

    if (!blogPost) {
        return <></>
    }

    const changeLocation = () => {
        dispatch(setMarkerPosition());
        dispatch(changeBlogPostLocationRequest({
            id: blogPost.id,
            coordinates: {
                latitude: blogPost.latitude,
                longitude: blogPost.longitude
            }
        }))
    }

    const resetLocation = () => {
        dispatch(setMarkerPosition());
        dispatch(resetCoordinatesChanged());
    }

    return <div>
        Coordinates: <br />
        {blogPost.latitude.toFixed(4)}, {blogPost.longitude.toFixed(4)}
        <Button onClick={() => dispatch(setMarkerPosition({
            latitude: mapCenter?.latitude ?? 0,
            longitude: mapCenter?.longitude ?? 0
        }))}>
            <FontAwesomeIcon icon={faLocation} />
        </Button>
        {
            coordinatesChanged ?
                <Button onClick={changeLocation}>
                    <FontAwesomeIcon icon={faCheck} />
                </Button>
                : <></>
        }
        {
            coordinatesChanged ?
                <Button color='error' onClick={resetLocation}>
                    <FontAwesomeIcon icon={faX}/>
                </Button>
                :<></>
        }
    </div>
}