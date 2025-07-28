import { MdModeEdit } from "react-icons/md";
import "./Profile.css";
import Menu from "../components/menu/Menu";

const Profile: React.FC = () => {
    return (<>
        <Menu/>   
        <h1>Profile Page</h1>
        <div className="profile-page">

            <div className="main-panel">
                <div className="profile-header">
                    <div className="profile-picture-container">
                        <img className="profile-picture" src="https://placehold.co/200x200" alt="Profile Picture" />
                        <button className="change-picture">
                            <MdModeEdit />
                        </button>
                    </div>
                    <div className="profile-info-container">
                        <div className="profile-info">
                            <div className="info-row"><span className="info-label">Username</span><span className="info-data">Placeholder</span></div>
                            <div className="info-row"><span className="info-label">Email</span><span className="info-data">Placeholder</span></div>
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
                            <div className="group-item">
                                <span className="group-name">Group 1</span>
                                <span className="group-members">
                                    <img src="https://placehold.co/20x20" alt="Profile Picture" />
                                    <img src="https://placehold.co/20x20" alt="Profile Picture" />
                                    <img src="https://placehold.co/20x20" alt="Profile Picture" />
                                </span>
                            </div>
                            <div className="group-item">
                                <span className="group-name">Group 2</span>
                                <span className="group-members">
                                    <img src="https://placehold.co/20x20" alt="Profile Picture" />
                                    <img src="https://placehold.co/20x20" alt="Profile Picture" />
                                    <img src="https://placehold.co/20x20" alt="Profile Picture" />
                                </span>
                            </div>
                            <div className="group-item">
                                <span className="group-name">Group 3</span>
                                <span className="group-members">
                                    <img src="https://placehold.co/20x20" alt="Profile Picture" />
                                    <img src="https://placehold.co/20x20" alt="Profile Picture" />
                                    <img src="https://placehold.co/20x20" alt="Profile Picture" />
                                </span>
                            </div>
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