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
import { UserSettings } from "../user/UserSettings";
import { AdminPage } from "../admin/AdminPage";
import { ResetPassword } from "../authentication/ResetPassword";
import { UserProfile } from "../user/UserProfile";
import { KomootTourLoader } from "../komoot/KomootTourLoader";
import { KomootTourDownload } from "../komoot/KomootTourDownload";
import { StravaTourLoader } from "../strava/StravaTourLoader";
import { StravaActivityDownload } from "../strava/StravaActivityDownload";


export const RouterOutlet: FunctionComponent = () => {
    return <Routes>
        <Route path="" element={<StartPage />} />
        <Route path={Paths.LoginPage} element={<Login />} />
        <Route path={Paths.RegisterPage} element={<Register />} />
        <Route path={Paths.RequestCodePage} element={<RequestCode />} />
        <Route path={Paths.ValiateCodePage} element={<ValidateCode />} />
        <Route path={Paths.ResetPasswordPage} element={<ResetPassword />} />

        <Route path={Paths.AdminPage} element={<AdminPage />} />

        <Route path={Paths.UserSettingsPage} element={<UserSettings />} />
        <Route path={Paths.UserProfilePage} element={<UserProfile />} />
        
        <Route path={Paths.CreateTourPage} element={<CreateTour />} />
        <Route path={Paths.EditTourPage} element={<EditTour />} />

        <Route path={Paths.KomootTourStartPage} element={<KomootTourLoader />} />
        <Route path={Paths.KomootTourDownloadPage} element={<KomootTourDownload />} />

        <Route path={Paths.StravaTourStartPage} element={<StravaTourLoader />} />
        <Route path={Paths.StravaDownloadPage} element={<StravaActivityDownload />} />
    </Routes>
}