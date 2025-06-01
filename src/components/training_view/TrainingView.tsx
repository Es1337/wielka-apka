import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import Menu from "../menu/Menu";
import Table from "../table/Table";
import Modal from "../modal/Modal";
import { AxiosResponse } from "axios";
import API from '../../api'
import { GroupType } from "../../types/GroupTypes";
import { set } from "lodash";


const TrainingView: React.FC = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false)
    const { groupId, trainingId } = useParams();
    const [exercises, setExercises] = useState([])
        
        useEffect(() => {
        async function getTrainingData() {
            let groupResponse: AxiosResponse;
            let trainingsResponse: AxiosResponse;
            try {
                groupResponse = await API.get("/group/" + groupId, { withCredentials: true });
                let groupPayload: GroupType = groupResponse.data;
                console.log(groupPayload);
                setUsers(groupPayload.users || []);

                trainingsResponse = await API.get("/group/" + groupId + "/training/" + trainingId, { withCredentials: true });
                let trainingPayload = trainingsResponse.data;
                console.log(trainingPayload);
                setExercises(trainingPayload.exercises || []);
            } catch (e) {
                console.error('Failure fetching group with id:', groupId);
            }
        }
        getTrainingData();
    }, []);

    function placeholder(formData: FormData) {
        let exerciseResult: string[] = []
        formData.getAll("reps").forEach((res) => exerciseResult.push(res.toString()))
        
        setExercises([...exercises, {
            name: formData.get("exercise-name").toString(),
            results: exerciseResult
        }])
    }
    
    return (
        <>
            <Menu/>
            {showModal && 
                <Modal modalAction={placeholder} onClose={() => setShowModal(false)} modalHeader="Add Exercise">
                    <input 
                        type="text"
                        name="exercise-name"
                        placeholder="Exercise Name..."
                        required
                        />
                    {users.map((user) => (
                        <input
                            type="text"
                            name="reps"
                            placeholder={`Reps for ${user.name}...`}
                        />
                    ))}
                </Modal>}
            <h1></h1>
            <Table rowData={exercises} colData={users} addRowCallback={() => setShowModal(true)}></Table>
        </>
    )
}

export default TrainingView;