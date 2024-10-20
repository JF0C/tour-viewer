import { AppBar } from "@mui/material";
import { FunctionComponent, ReactNode } from "react";
import { Navbar } from "../navigation/Navbar";
import { ImageUpload } from "../components/ImageUpload";
import { LoginComponent } from "../components/LoginComponent";

export type MainLayoutProps = {
    children: ReactNode
}

export const MainLayout: FunctionComponent<MainLayoutProps> = (props) => {

    return <div className="h-full main-layout flex flex-col">
        <div className="h-14 text-center">
            <AppBar sx={{ backgroundColor: '#282c34' }}>
                <div className='p-2 text-2xl md:text-3xl'>CK Cycling Tour Viewer</div>
            </AppBar>
        </div>
        <div className="flex-1 flex flex-row flex-wrap">
            <div className="hidden md:block w-1/6 border border-solid">
                <Navbar />
            </div>
            <div className="w-full md:w-4/6 border border-solid">
                {props.children}
            </div>
            <div className="w-full md:w-1/6 border border-solid">
                <ImageUpload />
                <LoginComponent />
            </div>
        </div>
    </div>
}