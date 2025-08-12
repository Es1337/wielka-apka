import { MdModeEdit } from "react-icons/md";
import "./Profile.css";
import Menu from "../components/menu/Menu";
import { useEffect, useState } from "react";
import UserService from "../services/UserService";
import { User } from "../types/UserTypes";
import { GroupType } from "../types/GroupTypes";
import ProfileCard from "../components/profile/ProfileCard";
import FriendsCard from "../components/profile/FriendsCard";

const Profile: React.FC = () => {
    const [userInfo, setUserInfo] = useState<User>({
        name: null,
        email: null,
        picture: null,
        friends: []
    });

    const [groups, setGroups] = useState<GroupType[]>([]);
    const [showFriends, setShowFriends] = useState(false);
    const [showProfile, setShowProfile] = useState(true);


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

    const showFriendsCard = () => {
        setShowFriends(true);
        setShowProfile(false);
    };

    const showProfileCard = () => {
        setShowFriends(false);
        setShowProfile(true);
    }

    return (<>
        <Menu/>

        <h1>Profile Page</h1>
        <div className="profile-page">
            {showProfile && <ProfileCard userInfo={userInfo} groups={groups}/>}
            {showFriends && <FriendsCard backCallback={showProfileCard}/>}
            <div className="side-panel">
                <button className="settings-btn">Settings</button>
                <button className="analytics-btn">Analytics</button>
                <button className="friends-btn" onClick={showFriendsCard}>Friends</button>
            </div>
        </div>
    </>);
}

export default Profile;