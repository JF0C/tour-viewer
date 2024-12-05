import { FunctionComponent } from "react";
import { useAppSelector } from "../../store/store";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { CleanupItem } from "./cleanupItem";

export const CleanupView: FunctionComponent = () => {
    const systemState = useAppSelector((state) => state.system);

    if (systemState.loading) {
        return <>
            Searching files and references to delete.
            This may take several minutes.
            <LoadingSpinner />
        </>
    }

    return <div style={{maxHeight: '60vh'}} className="overflow-y-scroll w-96 grid grid-cols-2 gap-2">
        {
            systemState.cleanupResult.length === 0 ? 'nothing to cleanup' :
            systemState.cleanupResult.map(x => <CleanupItem data={x}/>)
        }
    </div>
}