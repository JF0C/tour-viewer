import { FunctionComponent, ReactNode } from "react";

export type MainLayoutProps = {
    children: ReactNode
}

export const MainLayout: FunctionComponent<MainLayoutProps> = (props) => {

    return <div className="h-full">
        {props.children}
    </div>
}