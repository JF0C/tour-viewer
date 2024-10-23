import { FunctionComponent } from "react";
import { UserList } from "./userList";
import { useAppSelector } from "../../store/store";

export const AdminPage: FunctionComponent = () => {
    const user = useAppSelector((state) => state.auth.user)
    if (!user?.roles.includes('admin'))
    {
        return <div>Unauthorized</div>
    }
    
    return <div>
        <UserList />
    </div>
}