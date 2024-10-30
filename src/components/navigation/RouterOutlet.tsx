import { FunctionComponent } from "react";
import { Route, Routes } from "react-router-dom";
import { Paths } from "../../constants/Paths";
import { Login } from "../authentication/Login";
import { Register } from "../authentication/Register";
import { RequestCode } from "../authentication/RequestCode";
import { ValidateCode } from "../authentication/ValidateCode";
import { StartPage } from "../home/StartPage";
import { CreateTour } from "../tourEditing/CreateTour";
import { EditTour } from "../tourEditing/EditTour";
import { UserProfile } from "../user/UserProfile";
import { AdminPage } from "../userManagement/AdminPage";


export const RouterOutlet: FunctionComponent = () => {
    return <Routes>
        <Route path="" element={<StartPage />} />
        <Route path={Paths.LoginPage} element={<Login />} />
        <Route path={Paths.RegisterPage} element={<Register />} />
        <Route path={Paths.RequestCodePage} element={<RequestCode />} />
        <Route path={Paths.ValiateCodePage} element={<ValidateCode />} />

        <Route path={Paths.AdminPage} element={<AdminPage />} />

        <Route path={Paths.UserPage} element={<UserProfile />} />
        
        <Route path={Paths.CreateTourPage} element={<CreateTour />} />
        <Route path={Paths.EditTourPage} element={<EditTour />} />
    </Routes>
}