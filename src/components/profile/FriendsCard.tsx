import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDumbbell } from '@fortawesome/free-solid-svg-icons'

type FriendsCardProps = {
    backCallback: () => void;
}

const FriendsCard: React.FC<FriendsCardProps> = ({backCallback: backCallback}) => {
    return (
        <div className="profile-header friends-card">
            <h2>Friends</h2>
            <div className="profile-info-container">
                <div className='profile-info'>
                    <div className="info-row">
                        <span className="friend-data">Friend 1</span>
                        <span className={false ? "friend-online" : "friend-offline"}>
                            <FontAwesomeIcon icon={faDumbbell} size='lg'/>
                        </span>
                    </div>
                    <div className="info-row">
                        <span className="friend-data">Friend 2</span>
                        <span className={true ? "friend-online" : "friend-offline"}>
                            <FontAwesomeIcon icon={faDumbbell} size='lg'/>
                        </span>
                    </div>
                    <div className="info-row">
                        <span className="friend-data">Friend 3</span>
                        <span className={false ? "friend-online" : "friend-offline"}>
                            <FontAwesomeIcon icon={faDumbbell} size='lg'/>
                        </span>
                    </div>
                    <button className="back-btn" onClick={() => backCallback()}>Back</button>
                </div>
            </div>
        </div>
    );
}

export default FriendsCard;