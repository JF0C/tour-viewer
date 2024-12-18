import { FunctionComponent, useState } from "react";
import { useAppDispatch } from "../../store/store";
import { blogPostsWithoutTimeRequest } from "../../store/systemThunk";
import { Button } from "@mui/material";

export const ToursWithoutCountry: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const [tourIds, setTourIds] = useState<number[] | undefined>();

    const loadToursWithoutCountry = () => {
        dispatch(blogPostsWithoutTimeRequest())
            .unwrap()
            .then(ids => setTourIds(ids));
    }

    return <div>
        <div>
            Check if all tours have at least one country assigned
        </div>
        <div>
            {
                tourIds === undefined ?
                    <Button onClick={loadToursWithoutCountry}>Load Blogposts</Button>
                    : tourIds.length === 0 ?
                        'all tours have a country!'
                        :
                        tourIds.map(id => <div key={'tours-without-country-' + id}>{id}</div>)
            }
        </div>
    </div>
}