import { FunctionComponent } from "react";
import { UserList } from "./userList";
import { AuthProvider } from "../authentication/AuthProvider";

export const AdminPage: FunctionComponent = () => {
    console.log('admin page');
    return <AuthProvider>
        <UserList />
    </AuthProvider>
}