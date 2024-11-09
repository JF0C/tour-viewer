import { FunctionComponent, ReactNode } from "react"

export type BigFormLayoutProps = {
    children: ReactNode | ReactNode[]
    buttons?: ReactNode | ReactNode[]
}

export const BigFormLayout: FunctionComponent<BigFormLayoutProps> = (props) => {

    return <div className="flex flex-col overflow-y-scroll flex-1">
        <div className="p-4 md:p-12 flex-1 flex flex-col gap-2 overflow-y-scroll">
            {props.children}
        </div>
        <div className="p-4 h-14 bg-primary flex flex-row justify-center">
            <div className="w-full md:w-96 flex flex-row gap-2 justify-between items-center">
                {props.buttons}
            </div>
        </div>
    </div>
}