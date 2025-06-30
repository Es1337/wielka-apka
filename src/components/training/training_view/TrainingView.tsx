import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Menu from "../../menu/Menu";
import Table from "../table/Table";
import Modal from "../../modal/Modal";
import { AxiosResponse } from "axios";
import API from '../../../api'
import { GroupType } from "../../../types/GroupTypes";
import { ExerciseType } from "../../../types/TrainingTypes";


const TrainingView: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false)
    const { groupId, trainingId } = useParams();
    const [exercises, setExercises] = useState([]);
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [isAddModal, setIsAddModal] = useState(false);
    const [defaults, setDefaults] = useState<Record<string, any>>({});

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
                setExercises(trainingPayload.exercises || []);
            } catch (e) {
                console.error('Failure fetching group with id:', groupId);
            }
        }
        getTrainingData();
    }, [showModal]);

    useEffect(() => {
        if (selectedExercises.length === 0) {
            console.log("No exercises selected");
            return;
        }
        console.log("Selected Exercises updated:", selectedExercises);
        navigate(
            location.pathname + '/modify-exercise',
            { state: { exerciseName: selectedExercises[0]?.name, exercises: selectedExercises, users, groupId, trainingId } }
        );
    }, [selectedExercises]);

    async function addExerciseAPI(newExerciseName: String): Promise<ExerciseType | undefined> {
        let exerciseResponse: AxiosResponse;
        try {
            exerciseResponse = await API.post(
                `/group/${groupId}/training/${trainingId}/exercise`,
                {
                    exerciseName: newExerciseName,
                },
                { withCredentials: true }
            );
            let payload: ExerciseType = exerciseResponse.data;
            console.log(payload);
            return payload;
        } catch (e) {
            console.error('Failure adding exercise in group: ', groupId);
            return;
        }
    }

    function addExercise(formData: FormData) {
        addExerciseAPI(
            formData.get('exercise-name').toString()
        ).then((exercise) => {
            if (exercise) {
                setExercises((exercises) => ([
                    ...exercises,
                    exercise
                ]));
            }
            setShowModal(false);
        });
    }

    function defaultValues(isAdd: boolean = false): Record<string, any> {
        if (isAdd) {
            return null;
        } else {
            return API.get(
                `/group/${groupId}/training/${trainingId}/exercise/exerciseName`,
                { withCredentials: true })
        }
    }

    function onAddRow(): void {
        setDefaults(defaultValues(true));
        console.log("Default Values", defaults);
        setShowModal(true);
        setIsAddModal(true);
    }

    function handleRowClick(exerciseName: string, exerciseIds: { _id: string }[]) {
        console.log("Exercise IDs", exerciseIds);
        let mappedIds = exerciseIds.map((exerciseId) => exerciseId._id);
        let temp = exercises.filter((exercise) => {
            console.log("Exercise ID", String(exercise._id));
            console.log("Mapped Exercise ID", exercise._id);
            return mappedIds.includes(String(exercise._id))
        });
        console.log("Filtered Exercises", temp);
        setSelectedExercises(temp);
    }

    function onModalClose(): void {
        setShowModal(false);
        setIsAddModal(false);
        setDefaults({});
    }

    return (
        <>
            <Menu />
            {showModal &&
                <Modal modalAction={addExercise} onClose={onModalClose} modalHeader="Add Exercise">
                    <input
                        type="text"
                        name="exercise-name"
                        placeholder="Enter Name..."
                        required />
                </Modal>}
            <h1></h1>
            <Table rowData={exercises} colData={users} addRowCallback={onAddRow} handleRowClick={handleRowClick}></Table>
        </>
    )
}

export default TrainingView;

