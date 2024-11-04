import { FunctionComponent } from "react";
import { LoadingSpinner } from "./LoadingSpinner";

export const OverallLoadingSpinner: FunctionComponent = () => {
    return <div className="absolute w-full h-full flex flex-row justify-center items-center"
        style={{ zIndex: 1000, backgroundColor: 'rgba(123, 123, 123, 0.8)' }}>
        <LoadingSpinner />
    </div>
}