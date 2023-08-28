import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { currentUser } from "../../features/authSlice";
const RequireAuth = () => {
    const user = useSelector(currentUser)
    const location = useLocation()
    return (

        user ? <Outlet /> : <Navigate to={"/"} state={{ from: location }} replace />
    )
}
export default RequireAuth