import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import Menu from "../menu/Menu";
import Table from "../table/Table";
import Modal from "../modal/Modal";
import { AxiosResponse } from "axios";
import API from '../../api'
import { GroupType } from "../../types/GroupTypes";
import { SetType } from "../../types/TrainingTypes";
import DynamicModal from "../modal/DynamicModal";
import ExerciseSchema, { SetSchema } from "../../schemas/ExerciseSchema";
import z, { infer as zodInfer } from "zod";


const TrainingView: React.FC = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false)
    const { groupId, trainingId } = useParams();
    const [exercises, setExercises] = useState([])
    const [isAddModal, setIsAddModal] = useState(false);
    const [defaults, setDefaults] = useState<Record<string, any>>({});
    // var defaults = {};
        
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
    }, []);

    function addExercise(formData: z.infer<typeof ExerciseSchema>) {
        let exerciseSets: SetType[] = []
        console.log("Form Data", formData);
        for (let set of formData.sets) {
            exerciseSets.push({
                weight: set.weight,
                reps: set.reps,
                user: set.user || []
            });
        }
        setExercises([...exercises, {
            name: formData.get("exercise-name").toString(),
            sets: exerciseSets
        }])
    }

    function defaultValues(isAdd: boolean = false): Record<string, any> {
        if (isAdd) {
            return  {
                name: '',
                sets: [] as typeof SetSchema[],
            }
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

    function onModalClose(): void {
       setShowModal(false);
       setIsAddModal(false);
       setDefaults({});
    }
    
    return (
        <>
            <Menu/>
            {showModal && 
                <DynamicModal modalAction={addExercise} onClose={onModalClose}
                    modalHeader="Add Exercise" users={users} modalSchemaType={ExerciseSchema} 
                    fieldArrayName="sets" defaultValues={defaults}>
                </DynamicModal>}
            <h1></h1>
            <Table rowData={exercises} colData={users} addRowCallback={onAddRow}></Table>
        </>
    )
}

export default TrainingView;

