import { faFlag } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent } from "react";
import { useAppDispatch } from "../../store/store";
import { countryInUseJobRequest } from "../../store/systemThunk";
import { BaseConfirmModal } from "../shared/BaseConfirmModal";

export const CountriesInUseButton: FunctionComponent = () => {
    const dispatch = useAppDispatch();

    return <BaseConfirmModal buttonContent={
            <>
                <FontAwesomeIcon icon={faFlag}/>&nbsp;
                Check country usage
            </>
        }
        onConfirm={() => dispatch(countryInUseJobRequest())}
    >
        <div>
            Check for all countries, whether they are referenced by any tour or blog post.
            Sets the in-use property for countries.
            Countries, that are not in used are not shown as option in search filters.
        </div>
    </BaseConfirmModal>
}