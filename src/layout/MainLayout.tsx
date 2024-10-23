import { AppBar } from "@mui/material";
import { FunctionComponent, ReactNode } from "react";
import { Navbar } from "../navigation/Navbar";
import { ImageUpload } from "../components/tourEditing/ImageUpload";
import { useAppSelector } from "../store/store";
import { NavLink } from "react-router-dom";
import { Paths } from "../constants/Paths";

export type MainLayoutProps = {
    children: ReactNode
}

export const MainLayout: FunctionComponent<MainLayoutProps> = (props) => {
    const user = useAppSelector((state) => state.auth.user);    

    return <div className="h-full main-layout flex flex-col">
        <div className="h-14">
            <AppBar sx={{ backgroundColor: '#282c34' }}>
                <div className="flex flex-row justify-center">
                    <div className='p-2 text-2xl md:text-3xl'>
                        CK Cycling Tour Viewer
                    </div>
                    <div>
                    {
                        user !== undefined ? <div>{user.username}</div>
                        : <NavLink to={Paths.LoginPage}>Login</NavLink>
                    }
                    </div>

                </div>
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
            </div>
        </div>
    </div>
}