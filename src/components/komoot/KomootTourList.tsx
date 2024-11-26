import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Button, Pagination } from "@mui/material";
import { komootToursRequest } from "../../store/komootThunk";
import { KomootTourListItem } from "./KomootTourListItem";
import { BigFormLayout } from "../layout/BigFormLayout";
import { NavLink } from "react-router-dom";
import { Paths } from "../../constants/Paths";
import { clearKomootSelectedTours } from "../../store/komootStateReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faX } from "@fortawesome/free-solid-svg-icons";


export const KomootTourList: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const komootState = useAppSelector((state) => state.komoot);
    const invalid = komootState.toursToDownload.length === 0;

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

    const clearSelected = () => {
        dispatch(clearKomootSelectedTours());
    }

    return <BigFormLayout buttons={
        <div className="flex flex-row w-full justify-between">
        <NavLink to={Paths.EditTourPage}>
            <Button>
                <FontAwesomeIcon icon={faArrowLeft} />
                &nbsp;Back
            </Button>
        </NavLink>
            <Button onClick={clearSelected} color='error' disabled={invalid}>
                <FontAwesomeIcon icon={faX} />
                &nbsp;Clear
            </Button>
            <NavLink to={invalid ? Paths.KomootTourStartPage : Paths.KomootTourDownloadPage}>
                <Button disabled={invalid}>
                    <FontAwesomeIcon icon={faArrowRight} />
                    &nbsp;Continue
                </Button>
            </NavLink>
        </div>
    }>
        <div className="w-full text-xl font-bold flex flex-row justify-center">
            <img width="30" src="icon/komoot-icon.png" alt='komoot-icon'/>
            &nbsp;Select Tours for Import
        </div>
        <div className="flex flex-row flex-wrap gap-2">
            {
                komootState.komootTourData._embedded.tours.map(t =>
                    <KomootTourListItem key={t.id} tour={{
                        id: t.id,
                        name: t.name,
                        distance: t.distance,
                        date: t.date,
                        previewImageUrl: t.map_image_preview.src,
                        state: 'ready'
                    }} />
                )
            }
        </div>
        <Pagination sx={{ color: 'white' }} page={komootState.tourPagination.page} count={komootState.tourPagination.totalPages} siblingCount={0} boundaryCount={1}
            onChange={(e: any, page: number) => changePage(page)} />
    </BigFormLayout>
}