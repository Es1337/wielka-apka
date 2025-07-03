import { useLocation } from "react-router-dom";
import ExerciseTable from "../table/ExerciseTable";
import Modal from "../../modal/Modal";
import Menu from "../../menu/Menu";
import { use, useEffect, useState } from "react";
import { ExerciseType, SetType } from "../../../types/TrainingTypes";
import { AxiosResponse } from "axios";
import API from "../../../api";
import _ from "lodash";
import { GoogleUser } from "../../../types/UserTypes";
import { boolean } from "zod";
import { GroupType } from "../../../types/GroupTypes";

interface ModifyExerciseProps {
    groupId: string;
    trainingId: string;
    users: GoogleUser[];
    exerciseName?: string;
    exercises: ExerciseType[];
}

const ModifyExercise: React.FC = () => {
    const location = useLocation();
    console.log("Location state", location.state);
    const { exerciseName, exercises: passedExercises, users: passedUsers, groupId, trainingId } = location.state as ModifyExerciseProps;
    const [showModal, setShowModal] = useState(false);
    const [groupedExercises, setGroupedExercises] = useState<Record<string, ExerciseType[]>>(_.groupBy(passedExercises, 'user'));
    const [users, setUsers] = useState<GoogleUser[]>(passedUsers || []);
    const [activeUser, setActiveUser] = useState<string>();

    useEffect(() => {
        async function getTrainingData() {
            let groupResponse: AxiosResponse;
            let trainingsResponse: AxiosResponse;
            try {
                groupResponse = await API.get("/group/" + groupId, { withCredentials: true });
                let groupPayload: GroupType = groupResponse.data;
                setUsers(groupPayload.users || []);

                trainingsResponse = await API.get("/group/" + groupId + "/training/" + trainingId, { withCredentials: true });
                let trainingPayload = trainingsResponse.data;
                setGroupedExercises(_.groupBy(trainingPayload.exercises, 'user'));
            } catch (e) {
                console.error('Failure fetching group with id:', groupId);
            }
        }
        getTrainingData();
    }, [])

    async function addSetAPI(exerciseId: String, weight: number, reps: number): Promise<SetType | undefined> {
        let exerciseResponse: AxiosResponse;
        try {
            exerciseResponse = await API.post(
                `/group/${groupId}/training/${trainingId}/exercise/${exerciseId}/set`,
                {
                    set: {
                        weight: weight,
                        reps: reps,
                    }
                },
                { withCredentials: true }
            );
            let payload: SetType = exerciseResponse.data;
            console.log(payload);
            return payload;
        } catch (e) {
            console.error('Failure adding exercise in group: ', groupId);
            return;
        }
    }

    async function removeSetAPI(exerciseId: string, count: string): Promise<Boolean | undefined> {
        let exerciseResponse: AxiosResponse;
        try {
            exerciseResponse = await API.delete(
                `/group/${groupId}/training/${trainingId}/exercise/${exerciseId}/set/${count}`,
                { withCredentials: true }
            );
            let payload: SetType = exerciseResponse.data;
            console.log(payload);
            return exerciseResponse.status === 200;
        } catch (e) {
            console.error('Failure adding exercise in group: ', groupId);
            return;
        }
    }

    function addSet(formData: FormData) {
        const exerciseId = groupedExercises[activeUser as string][0]._id;
        addSetAPI(
            exerciseId as String,
            parseFloat(formData.get('set-weight') as string),
            parseInt(formData.get('set-reps') as string)
        )
        .then((set: SetType | undefined) => {
            if (set) {
                setGroupedExercises((prevExercises) => {
                    const updatedExercises = { ...prevExercises };
                    const userExercises = updatedExercises[activeUser as string]
                        ? [...updatedExercises[activeUser as string]]
                        : [];
                    if (userExercises.length > 0) {
                        const updatedSets = [
                            ...userExercises[0].sets,
                            set
                        ];
                        userExercises[0] = {
                            ...userExercises[0],
                            sets: updatedSets
                        };
                        updatedExercises[activeUser as string] = userExercises;
                    }
                    return updatedExercises;
                });
            }
            setShowModal(false);
            setActiveUser(null);
        })
    }

    function onAddSet(userId: String): void {
        setShowModal(true);
        setActiveUser(userId as string);
    }

    function handleRowClick(): void {
        // This function can be used to handle row clicks if needed
        // For now, it does nothing
    }

    function handleRemoveSet(userId: string, count: number): void {
        removeSetAPI(groupedExercises[userId][0]._id as string, count.toString())
        .then((isRemoved: Boolean | undefined) => {
            if (isRemoved) {
                setGroupedExercises((prevExercises) => {
                    const updatedExercises = { ...prevExercises }
                    const updatedSets = updatedExercises[userId][0].sets.filter((set) => set.count !== count)

                    for( let i = 0; i < updatedSets.length; i++) {
                        updatedSets[i].count = i;
                    }
                    updatedExercises[userId][0].sets = updatedSets;

                    return updatedExercises;
                });
            }
        });
    }

    function onModalClose(): void {
        setShowModal(false);
        setActiveUser(null);
    }

    return (
        <div className="block">
            <Menu />
            <h1>Modify {exerciseName}</h1>
            {showModal &&
                <Modal modalAction={addSet} onClose={onModalClose} modalHeader="Add Set">
                    <input
                        type="text"
                        name="set-weight"
                        placeholder="Enter Weight..."
                        required />
                    <input
                        type="text"
                        name="set-reps"
                        placeholder="Enter Reps..."
                        required />
                </Modal>}
            <h1></h1>
            <ExerciseTable rowData={groupedExercises} colData={users} addRowCallback={onAddSet} handleRowClick={handleRowClick} handleRemoveSet={handleRemoveSet}></ExerciseTable>
        </div>
    );
}

export default ModifyExercise;