import { FunctionComponent, ReactNode } from "react"

export type SmallFormLayoutProps = {
    children: ReactNode | ReactNode[]
    buttons?: ReactNode | ReactNode[]
}

export const SmallFormLayout: FunctionComponent<SmallFormLayoutProps> = (props) => {

    return <div className="p-4 md:p-12 h-full flex flex-row justify-center">
        <div className="flex flex-col h-full overflow-y-scroll max-w-96">
            <div className="flex flex-col gap-2 flex-1">
                {props.children}
            </div>
            <div className="mt-2 flex flex-col md:flex-row gap-2 md:bg-primary">
                {props.buttons}
            </div>
        </div>
    </div>
}