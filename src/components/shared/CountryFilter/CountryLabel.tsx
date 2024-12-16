import { FunctionComponent, ReactNode } from "react";

export type CountryLabelProps = {
    label: string
    children?: ReactNode
}

export const CountryLabel: FunctionComponent<CountryLabelProps> = (props) => {
    return <div className="flex flex-row gap-2 items-center border border-white rounded-full px-2">
        {props.label}
        {props.children}
    </div>
}