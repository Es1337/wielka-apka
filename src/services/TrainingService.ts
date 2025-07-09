import API from '../api';
import { TrainingType } from '../types/TrainingTypes';

const getTrainingsForGroup = (groupId: string) => {
    return API.get<TrainingType[]>("/group/" + groupId + "/training", 
        { withCredentials: true });
}

const createTraining = (groupId: string, newTrainingName: string, newTrainingDate: Date) => {
    return API.post<TrainingType>("group/" + groupId + "/training", {
                trainingName: newTrainingName,
                date: newTrainingDate || Date.now()
            }, { withCredentials: true });
}

const deleteTraining = (groupId: string, trainingId: string) => {
    return API.delete<any>(`/group/${groupId}/training/${trainingId}`, 
        { withCredentials: true });
}

const TrainingService = {
    getTrainingsForGroup,
    createTraining,
    deleteTraining
};

export default TrainingService;