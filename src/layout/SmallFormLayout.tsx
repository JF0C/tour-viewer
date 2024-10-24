import { FunctionComponent, ReactNode } from "react"

export type SmallFormLayoutProps = {
    children: ReactNode | ReactNode[]
    buttons?: ReactNode | ReactNode[]
}

export const SmallFormLayout: FunctionComponent<SmallFormLayoutProps> = (props) => {

    return <div className="p-4 md:p-12 flex flex-col">
        <div className="flex flex-col">
            { props.children }
        </div>
        <div className="mt-2 flex flex-col md:flex-row gap-2">
            { props.buttons }
        </div>
    </div>
}