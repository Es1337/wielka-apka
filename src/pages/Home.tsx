import React, { useEffect, useRef, useState } from "react";
import Group from "../components/Group";
import AddGroup from "../components/AddGroup";
import './Home.css'
import { Link } from "react-router-dom";
import Menu from "../components/menu/Menu";
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { AxiosResponse } from "axios";
import API from '../api'

const Home: React.FC = () => {
    type GroupType = {
        id: number,
        title: string
    }

    type CheckLoginResponse = {
        success: boolean
    }
    
    const groups = [
        { id: 1, title: "Group 1" },
        { id: 2, title: "Group 2" },
        { id: 3, title: "Group 3" }
    ];

    const [isLoggedIn, setLoginStatus] = useState(false);

    const logout = async () => {
		try {
			await API.get('/logout/user');
			setLoginStatus(false);
		}
		catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		async function getStatus() {
			try {
				const data: AxiosResponse = await API.get('/user/checkLoginStatus');
				const payload:CheckLoginResponse = data.data
				if (payload.success) {
					setLoginStatus(true);
				}
			}
			catch (e) {
				console.log(e);
				setLoginStatus(false);
			}
		}
		getStatus();
	}, [])

    return (
        <>
            <Menu/>
            <GoogleLogin
                onSuccess={async (credentialResponse: CredentialResponse) => { 
                    const bodyObject = {
                        authId: credentialResponse.credential
                    };
                    try {
                        await API.post('/login/user', bodyObject, { withCredentials: true }); 
                        setLoginStatus(true);
                    } catch (e) {
                        console.log(e)
                    }
                }}
                onError={() => console.log("Login failed")}
                auto_select={true}
            />
            
            {isLoggedIn && 
            <>
                <button onClick={logout}>Logout</button>
                <ul className="container">
                    {Object.values(groups).map((group: GroupType) => (
                        <li key={group.id}>
                                <Link to={`/group/${group.id}`}>
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