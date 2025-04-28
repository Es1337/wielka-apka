import { useEffect } from "react"
import { Navigate, Outlet, useLocation } from "react-router";
import API from "./api"



const PrivateRoutes: React.FC = () => {
    
    function isAuthenticated() {
        console.log("Authenticating")
        API.get("/user/checkLoginStatus", {withCredentials: true}).then(res => {
            if (res.data.success) {
                localStorage.setItem("isAuth", "true");
            } else {
                localStorage.removeItem("isAuth")
            }
        })
    }

    useEffect(() => {
      isAuthenticated();
    }, [localStorage.getItem("isAuth")]);
    const location = useLocation();

    return localStorage.getItem("isAuth") === "true" ? 
        <Outlet/> : 
        <Navigate to="/" replace state={{ from: location }}/>
}

export default PrivateRoutes;