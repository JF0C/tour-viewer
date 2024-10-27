import { FunctionComponent } from "react";
import { Route, Routes } from "react-router-dom";
import { Paths } from "../../constants/Paths";
import { TourSelector } from "../tourView/TourSelector";
import { AdminPage } from "../userManagement/AdminPage";
import { Login } from "../authentication/Login";
import { StartPage } from "../home/StartPage";
import { Register } from "../authentication/Register";
import { ValidateCode } from "../authentication/ValidateCode";
import { RequestCode } from "../authentication/RequestCode";
import { CreateTour } from "../tourEditing/CreateTour";
import { EditTour } from "../tourEditing/EditTour";


export const RouterOutlet: FunctionComponent = () => {
    return <Routes>
        <Route path="" element={<StartPage />} />
        <Route path={Paths.LoginPage} element={<Login />} />
        <Route path={Paths.RegisterPage} element={<Register />} />
        <Route path={Paths.RequestCodePage} element={<RequestCode />} />
        <Route path={Paths.ValiateCodePage} element={<ValidateCode />} />

        <Route path={Paths.AdminPage} element={<AdminPage />} />
        
        <Route path={Paths.CreateTourPage} element={<CreateTour />} />
        <Route path={Paths.EditTourPage} element={<EditTour />} />
    </Routes>
}