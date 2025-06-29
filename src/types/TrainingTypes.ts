import { GoogleUser } from "./UserTypes"

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
    date: Date,
    user: GoogleUser,
}

type SetType = {
    weight: number,
    reps: number,
    count: number,
}

export type { TrainingType, ExerciseType, SetType };