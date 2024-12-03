import { FunctionComponent } from "react";
import { useAppSelector } from "../../store/store";
import { LoadingSpinner } from "../shared/LoadingSpinner";

export const CleanupView: FunctionComponent = () => {
    const systemState = useAppSelector((state) => state.system);

    if (systemState.loading) {
        return <>
            Searching files and references to delete.
            This may take several minutes.
            <LoadingSpinner />
        </>
    }

    return <div className="overflow-y-scroll h-full w-96">
        {
            systemState.cleanupResult.length === 0 ? 'nothing to cleanup' :
            systemState.cleanupResult.map(x => <div>{x}</div>)
        }
    </div>
}