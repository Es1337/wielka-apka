import { MdModeEdit } from "react-icons/md";
import "./Profile.css";
import Menu from "../components/menu/Menu";
import { useEffect, useState } from "react";
import UserService from "../services/UserService";
import { User } from "../types/UserTypes";
import { GroupType } from "../types/GroupTypes";

const Profile: React.FC = () => {
    const [userInfo, setUserInfo] = useState<User>({
        name: null,
        email: null,
        picture: null,
        friends: []
    });

    const [groups, setGroups] = useState<GroupType[]>([]);

    useEffect(() => {
        async function fetchUserProfile() {
            try {
                let user = await UserService.getUserProfile();
                setUserInfo(user.data);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        }

        async function fetchUserGroups() {
            try {
                let groupResponse = await UserService.getGroupsForUser();
                setGroups(groupResponse.data);
            } catch (error) {
                console.error("Error fetching user groups:", error);
            }
        }
        fetchUserGroups();
        fetchUserProfile();
    }, []);

    return (<>
        <Menu/>

        <h1>Profile Page</h1>
        <div className="profile-page">

            <div className="main-panel">
                <div className="profile-header">
                    <div className="profile-picture-container">
                        <img className="profile-picture" src={userInfo.picture} alt="Profile Picture" />
                        <button className="change-picture">
                            <MdModeEdit />
                        </button>
                    </div>
                    <div className="profile-info-container">
                        <div className="profile-info">
                            <div className="info-row"><span className="info-label">Username</span><span className="info-data">{userInfo.name}</span></div>
                            <div className="info-row"><span className="info-label">Email</span><span className="info-data">{userInfo.email}</span></div>
                            <div className="info-row"><span className="info-label">Name</span><span className="info-data">Placeholder</span></div>
                            <div className="info-row"><span className="info-label">DOB</span><span className="info-data">Placeholder</span></div>
                            <div className="info-row"><span className="info-label">Joined</span><span className="info-data">Placeholder</span></div>
                        </div>
                        <button className="change-info">
                            <MdModeEdit />
                        </button>
                    </div>
                </div>
                <div className="recent-activity">
                    <div className="recent-groups">
                        <h2>Recent Groups</h2>
                        <div className="group-list">
                            {groups.map((group) => (
                                <div key={group._id.toLocaleString()} className="group-item">
                                    <span className="group-name">{group.groupName}</span>
                                    <span className="group-members">
                                        {group.users.map((user) => (
                                            <img key={user.toLocaleString()} src="https://placehold.co/20x20" alt="Profile Picture" />
                                        ))}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="side-panel">
                <button className="settings-btn">Settings</button>
                <button className="analytics-btn">Analytics</button>
                <button className="friends-btn">Friends</button>
            </div>
        </div>
    </>);
}

export default Profile;