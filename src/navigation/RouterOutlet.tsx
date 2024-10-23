import { FunctionComponent } from "react";
import { Route, Routes } from "react-router-dom";
import { Paths } from "../constants/Paths";
import { TourView } from "../components/tourView/TourView";
import { AdminPage } from "../components/userManagement/AdminPage";
import { Login } from "../components/authentication/Login";
import { StartPage } from "../components/home/StartPage";


export const RouterOutlet: FunctionComponent = () => {
    return <Routes>
        <Route path="" element={<StartPage />} />
        <Route path={Paths.LoginPage} element={<Login />} />
        <Route path={Paths.ToursPage} element={<TourView />} />
        <Route path={Paths.AdminPage} element={<AdminPage />} />
    </Routes>
}