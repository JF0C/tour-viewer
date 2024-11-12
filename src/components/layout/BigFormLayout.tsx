import { FunctionComponent, ReactNode } from "react"

export type BigFormLayoutProps = {
    children: ReactNode | ReactNode[]
    buttons?: ReactNode | ReactNode[]
}

export const BigFormLayout: FunctionComponent<BigFormLayoutProps> = (props) => {

    return <div className="flex flex-col flex-1 overflow-y-scroll">
        <div className="p-4 md:px-12 flex-1 flex flex-col gap-2 overflow-y-scroll pb-14">
            {props.children}
        </div>
        {
            props.buttons ?
            <div className="flex-none p-4 h-14 bg-primary flex flex-row justify-center absolute bottom-0 w-full">
                <div className="w-full md:w-96 flex flex-row gap-2 justify-between items-center">
                    {props.buttons}
                </div>
            </div>
            : <></>
        }
    </div>
}