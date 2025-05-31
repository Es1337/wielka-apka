import { GoogleUser } from "./UserTypes";

type TrainingType = {
    _id: Object,
    trainingName: string,
    exercises: ExerciseType[]
    date: Date,
}

type ExerciseType = {
    _id: Object,
    name: string,
    sets: SetType[]
}

type SetType = {
    _id: Object,
    user: GoogleUser[]
    weight: number,
    reps: number,
}

export type { TrainingType, ExerciseType, SetType };