import { useLocation } from "react-router-dom";
import ExerciseTable from "../table/ExerciseTable";
import Modal from "../../modal/Modal";
import Menu from "../../menu/Menu";
import { useState } from "react";
import { ExerciseType, SetType } from "../../../types/TrainingTypes";
import { AxiosResponse } from "axios";
import API from "../../../api";
import _ from "lodash";
import { GoogleUser } from "../../../types/UserTypes";

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
    const { exerciseName, exercises, users, groupId, trainingId } = location.state as ModifyExerciseProps;
    const [showModal, setShowModal] = useState(false);
    const groupedExercises = _.groupBy(exercises, 'user');

    async function addSetAPI(newExerciseName: String): Promise<SetType | undefined> {
        let exerciseResponse: AxiosResponse;
        try {
            exerciseResponse = await API.post(
                `/group/${groupId}/training/${trainingId}/exercise`, 
                { 
                    exerciseName: newExerciseName,
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

    function addSet(formData: FormData) {
        // Empty for now
    }

    function onAddSet(): void {
        setShowModal(true);
    }

    function onModalClose(): void {
       setShowModal(false);
    }

    return (
        <div className="block">
            <h1>Modify {exerciseName}</h1>
            <Menu/>
            {showModal && 
                <Modal modalAction={addSet} onClose={onModalClose} modalHeader="Add Set">
                        <input
                        type="text"
                        name="exercise-name"
                        placeholder="Enter Name..."
                        required/>
                </Modal>}
            <h1></h1>
            <ExerciseTable rowData={groupedExercises} colData={users} addRowCallback={onAddSet}></ExerciseTable>
        </div>
    );
}

export default ModifyExercise;