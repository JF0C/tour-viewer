import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getAppVersion } from "../../store/systemThunk";
import { LoadingSpinner } from "./LoadingSpinner";

export const VersionInfo: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const systemState = useAppSelector((state) => state.system);

    if (systemState.version === undefined && !systemState.loading) {
        dispatch(getAppVersion());
    }

    if (systemState.loading) {
        return <LoadingSpinner/>;
    }

    return <div style={{ color: 'white' }} className="p-2 text-lg w-full flex flex-row justify-center">
        {systemState.version}
    </div>
}