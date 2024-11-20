import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Button, Pagination } from "@mui/material";
import { komootToursRequest } from "../../store/komootThunk";
import { KomootTourListItem } from "./KomootTourListItem";


export const KomootTourList: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const komootState = useAppSelector((state) => state.komoot);

    const loadTours = () => {
        dispatch(komootToursRequest({
            page: komootState.tourPagination.page,
            count: komootState.tourPagination.itemsPerPage,
            authString: komootState.authString!,
            userId: komootState.userId!
        }));
    }

    if (!komootState.userId || !komootState.authString || !komootState.komootTourData) {
        return <Button onClick={loadTours}>
            Reload
        </Button>
    }

    const changePage = (page: number) => {
        dispatch(komootToursRequest({
            page: page,
            count: komootState.tourPagination.itemsPerPage,
            userId: komootState.userId!,
            authString: komootState.authString!
        }))
    }

    return <div>
        {
            komootState.komootTourData._embedded.tours.map(t => <KomootTourListItem tour={t} />)
        }
        <Pagination sx={{ color: 'white' }} page={komootState.tourPagination.page} count={komootState.tourPagination.totalPages} siblingCount={0} boundaryCount={1}
            onChange={(e: any, page: number) => changePage(page)} />
    </div>
}