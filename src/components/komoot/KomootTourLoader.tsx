import { FunctionComponent } from "react";
import { useAppSelector } from "../../store/store";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { KomootLogin } from "./KomootLogin";


export const KomootTourLoader: FunctionComponent = () => {
    const komootState = useAppSelector((state) => state.komoot);

    if (komootState.loading) {
        return <LoadingSpinner />
    }
    if (!komootState.userId) {
        return <KomootLogin />
    }
    return <div>
        {komootState.userId}
    </div>
}