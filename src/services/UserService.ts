import API from '../api';
import { User } from '../types/UserTypes';

const getUserProfile = () => {
    return API.get<User>('/user/profile', { withCredentials: true });
}

const UserService = {
    getUserProfile
};
export default UserService;