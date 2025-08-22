import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDumbbell } from '@fortawesome/free-solid-svg-icons'
import { GoogleUser } from '../../types/UserTypes';
import { useNavigate } from 'react-router';

type FriendsCardProps = {
    backCallback: () => void;
    friendsList: GoogleUser[];
}

const FriendsCard: React.FC<FriendsCardProps> = ({backCallback: backCallback, friendsList: friendsList}) => {
    const navigate = useNavigate();
    
    return (
        <div className="profile-header friends-card">
            <h2>Friends</h2>
            <div className="profile-info-container">
                <div className='profile-info'>
                    { friendsList.map((friend, index) => (
                        <div key={index} className="info-row" onClick={() => navigate(`/profile/${friend._id}`)}>
                            <span className="friend-data">{friend.name}</span>
                            <span className={index % 2 === 0 ? "friend-online" : "friend-offline"}>
                                <FontAwesomeIcon icon={faDumbbell} size='lg'/>
                            </span>
                        </div>
                    ))}
                    <button className="back-btn" onClick={() => backCallback()}>Back</button>
                </div>
            </div>
        </div>
    );
}

export default FriendsCard;