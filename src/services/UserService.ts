import API from '../api';
import { GroupType } from '../types/GroupTypes';
import { User } from '../types/UserTypes';

const getUserProfile = () => {
    return API.get<User>('/user/profile', { withCredentials: true });
}

const getGroupsForUser = () => {
    return API.get<GroupType[]>('/group/user', { withCredentials: true });
}

const UserService = {
    getUserProfile,
    getGroupsForUser
};
export default UserService;