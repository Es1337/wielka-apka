import API from '../api';
import { GroupType } from '../types/GroupTypes';
import { User } from '../types/UserTypes';

const getSelfProfile = () => {
    return API.get<User>('/user/profile', { withCredentials: true });
}

const getUserProfile = (userId: string) => {
    return API.get<User>('/user/profile/' + userId, { withCredentials: true });
}

const getGroupsForSelf = () => {
    return API.get<GroupType[]>('/group/user', { withCredentials: true });
}

const getGroupsForUser = (userId : string) => {
    return API.get<GroupType[]>('/group/user/' + userId, { withCredentials: true });
}

const UserService = {
    getUserProfile, 
    getSelfProfile,
    getGroupsForSelf,
    getGroupsForUser
};
export default UserService;