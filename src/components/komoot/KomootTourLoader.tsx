import { FunctionComponent } from "react";
import { komootToursRequest } from "../../store/komootThunk";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { KomootLogin } from "./KomootLogin";
import { KomootTourList } from "./KomootTourList";


export const KomootTourLoader: FunctionComponent = () => {
    const komootState = useAppSelector((state) => state.komoot);
    const dispatch = useAppDispatch();

    if (komootState.loading) {
        return <LoadingSpinner />
    }
    if (!komootState.userId || !komootState.authString) {
        return <KomootLogin />
    }
    const loadTours = () => {
        dispatch(komootToursRequest({
            page: komootState.tourPagination.page,
            count: komootState.tourPagination.itemsPerPage,
            authString: komootState.authString!,
            userId: komootState.userId!
        }));
    }
    if (!komootState.komootTourData) {
        loadTours();
    }
    return <div>
        <KomootTourList />
    </div>
}