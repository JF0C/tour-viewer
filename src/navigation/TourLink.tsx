import { FunctionComponent } from "react";

export type TourLinkProps = {
    path: string;
    displayName: string;
}

export const TourLink: FunctionComponent<TourLinkProps> = (props) => {
    return <div>
        {props.displayName}
    </div>
}