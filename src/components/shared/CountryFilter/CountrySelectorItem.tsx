import { FunctionComponent } from "react";
import { CountryDto } from "../../../dtos/shared/countryDto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faSquare } from "@fortawesome/free-regular-svg-icons";

export type CountrySelectorItemProps = {
    selected: boolean;
    country: CountryDto;
    onClick: (country: CountryDto) => void
}

export const CountrySelectorItem: FunctionComponent<CountrySelectorItemProps> = (props) => {
    return <div className="flex flex-row justify-between items-center p-2 cursor-pointer"
        onClick={() => props.onClick(props.country)}>
        <div className="w-12">
            {props.country.code}
        </div>
        <div className="flex-1">
            {props.country.name}
        </div>
        <div>
            {
                props.selected ? <FontAwesomeIcon icon={faCheckSquare} />
                : <FontAwesomeIcon icon={faSquare} />
            }
        </div>
    </div>
}