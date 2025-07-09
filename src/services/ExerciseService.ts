import API from '../api';
import { ExerciseType } from '../types/TrainingTypes';

const createExercise = (groupId: string, trainingId: string, newExerciseName: string) => {
    return API.post<ExerciseType[]>(
        `/group/${groupId}/training/${trainingId}/exercise`,
        {
            exerciseName: newExerciseName,
        },
        { withCredentials: true }
    );
}

const ExerciseService = {
    createExercise
};

export default ExerciseService;
