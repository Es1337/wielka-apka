import React, { useEffect, useState } from "react";
import Group from "../components/Group";
import AddGroup from "../components/AddGroup";
import './Home.css'
import { Link } from "react-router-dom";
import Menu from "../components/menu/Menu";
import { CredentialResponse, GoogleLogin, googleLogout } from '@react-oauth/google';
import { AxiosResponse } from "axios";
import API from '../api'
import Cookies from "js-cookie";

const Home: React.FC = () => {
    type GroupType = {
        _id: Object,
        groupName: string,
        date: Date,
        users: Object[]
    }

    type CheckLoginResponse = {
        success: boolean
    }


    const [isLoggedIn, setLoginStatus] = useState(false);
    const [groups, setGroups] = useState([]);

    const logout = async () => {
		try {
			await API.get('/logout/user');
			setLoginStatus(false);
            localStorage.removeItem("isAuth")
            Cookies.remove("login");
            googleLogout();
		}
		catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		async function getStatus() {
			try {
                if (localStorage.getItem("isAuth") === "true") {
                    setLoginStatus(true);
                } else {
                    const data: AxiosResponse = await API.get('/user/checkLoginStatus', {withCredentials: true});
                    const payload:CheckLoginResponse = data.data;
                    if (payload.success) {
                        setLoginStatus(true);
                    }
                }
			}
			catch (e) {
				console.log(e);
				setLoginStatus(false);
			}
		};
		getStatus();
	}, [])

    useEffect(() => {
        async function getGroupsForUser() {
            try {
                const data: AxiosResponse = await API.get('/group/user', {withCredentials: true});
                const payload:GroupType[] = data.data;
                setGroups(payload)
            } catch (e) {
                console.log(e)
            }
        };
        getGroupsForUser();
    }, [isLoggedIn])

    return (
        <>
            <Menu/>
            {!isLoggedIn &&
            <div className="google-login-box">
                <GoogleLogin
                    onSuccess={async (credentialResponse: CredentialResponse) => { 
                        const bodyObject = {
                            authId: credentialResponse.credential
                        };
                        try {
                            await API.post('/login/user', bodyObject, { withCredentials: true }); 
                            localStorage.setItem("isAuth", "true")
                            setLoginStatus(true);
                        } catch (e) {
                            console.log(e)
                        }
                    }}
                    onError={() => console.log("Login failed")}
                    text="signin"
                    size="large"
                    shape="pill"
                    width={200}
                    theme="filled_black"
                    />
            </div>
            }

            {isLoggedIn && 
            <>
                <button onClick={logout}>Logout</button>
                <ul className="container">
                    {Object.values(groups).map((group: GroupType) => (
                        <li key={group.groupName}>
                                <Link to={`/group/${group._id}`}>
                                    <Group />
                                </Link>
                            </li>
                        ))
                    }
                    <li><AddGroup/></li>
                </ul>
            </>
            }
        </>
    )
}

export default Home;