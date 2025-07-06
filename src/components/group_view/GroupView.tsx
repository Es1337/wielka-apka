import { Link, useParams } from 'react-router-dom'
import Menu from '../menu/Menu'
import './GroupView.css'
import React, { useEffect, useState } from 'react'
import Modal from '../modal/Modal'
import API from '../../api'
import { AxiosResponse } from 'axios'
import { GroupType } from '../../types/GroupTypes'
import { TrainingType } from '../../types/TrainingTypes'

const GroupView: React.FC = () => {
    const [showModal, setShowModal] = useState(false)
    const [trainings, setTrainings] = useState<TrainingType[]>([])
    const { groupId } = useParams();

    const [groupName, setGroupName] = useState('');

    useEffect(() => {
        async function getGroupData() {
            let groupResponse: AxiosResponse;
            let trainingsResponse: AxiosResponse;
            try {
                groupResponse = await API.get("/group/" + groupId, { withCredentials: true });
                let groupPayload: GroupType = groupResponse.data;
                console.log(groupPayload);
                setGroupName(groupPayload.groupName);

                trainingsResponse = await API.get("/group/" + groupId + "/training", { withCredentials: true });
                let trainingPayload: TrainingType[] = trainingsResponse.data;
                console.log(trainingPayload);
                setTrainings(trainingPayload);
            } catch (e) {
                console.error('Failure fetching group with id:', groupId);
            }
        }
        getGroupData();
    }, []);

    async function addTrainingAPI(newTrainingName: string, newTrainingDate: Date): Promise<TrainingType | undefined> {
        let training: AxiosResponse;
        try {
            training = await API.post("group/" + groupId + "/training", {
                trainingName: newTrainingName,
                date: newTrainingDate || Date.now()
            }, { withCredentials: true });
            let payload: TrainingType = training.data;
            console.log(payload);
            return payload;
        } catch (e) {
            console.error('Failure adding group');
            return;
        }
    }

    const addTraining = (formData: FormData): void => {
        addTrainingAPI(
            formData.get('training-name').toString(),
            new Date((formData.get('training-date').toString()))).then((training) => {
                setTrainings((trainings) => ([
                    ...trainings,
                    {
                        _id: training._id,
                        trainingName: training.trainingName,
                        date: training.date,
                        exercises: training.exercises
                    }
                ]));
                setShowModal(false);
            });
    }

    return (
        <>
            <Menu />
            {showModal &&
                <Modal modalAction={addTraining} onClose={() => setShowModal(false)} modalHeader='Add Training'>
                    <input
                        type="text"
                        name='training-name'
                        placeholder="Enter Name..."
                        required
                    />
                    <input
                        type="date"
                        name='training-date'
                        required
                    />
                </Modal>}
            <div className='training-container'>
                <h2>{groupName}</h2>
                {
                    Object.values(trainings).map((training) => (
                        <Link key={`${training._id}`} className='training-row' to={window.location.href + `/training/${training._id}`}>
                            <span className='text-box'>{training.trainingName}</span>
                            <span className='text-box'>{new Date(training.date).toLocaleDateString('pl-PL', {year: "2-digit", month: "numeric", day: "2-digit"})}</span>
                        </Link>
                    ))
                }
                <div className='training-row pseudo-link' onClick={() => setShowModal(true)}><span className='add-training' /></div>
            </div>
        </>
    )
}

export default GroupView;