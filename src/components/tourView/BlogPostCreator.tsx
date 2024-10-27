import { FunctionComponent } from "react";
import { useMapEvents } from "react-leaflet";

export const BlogPostCreator: FunctionComponent = () => {
    const map = useMapEvents({
        click(e) {
            console.log(e)
        },
        
    })
    return <></>
}