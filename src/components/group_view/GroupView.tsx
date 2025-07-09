import { Link, useParams } from 'react-router-dom'
import Menu from '../menu/Menu'
import './GroupView.css'
import React, { useEffect, useState } from 'react'
import Modal from '../modal/Modal'
import API from '../../api'
import { AxiosResponse } from 'axios'
import { GroupType } from '../../types/GroupTypes'
import { ExerciseType, TrainingType } from '../../types/TrainingTypes'
import { IoCopy } from "react-icons/io5";
import { CgCloseR } from "react-icons/cg";
import TrainingService from '../../services/TrainingService'
import ExerciseService from '../../services/ExerciseService'

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

                trainingsResponse = await TrainingService.getTrainingsForGroup(groupId as string);
                setTrainings(trainingsResponse.data);
                console.log(trainingsResponse.data);
            } catch (e) {
                console.error('Failure fetching group with id:', groupId);
            }
        }
        getGroupData();
    }, []);

    function addTrainingAPI(newTrainingName: string, newTrainingDate: Date): Promise<TrainingType> {
        return TrainingService.createTraining(groupId as string, newTrainingName, newTrainingDate)
            .then((response) => {
                let training: TrainingType = response.data;

                setTrainings((trainings) => ([
                    ...trainings,
                    training
                ]));

                console.log('Training created successfully:', training);
                return training;
            })
            .catch((error) => {
                console.error('Error creating training:', error);
                throw error;
            });
    }

    function deleteTrainingAPI(trainingId: string,): Promise<TrainingType> {
        return TrainingService.deleteTraining(groupId as string, trainingId)
            .then((response) => {
                let training: TrainingType = response.data;

                console.log('Training deleted successfully:', trainingId);
                return training;
            })
            .catch((error) => {
                console.error('Error deleting training:', error);
                throw error;
            });
    }

    const addTraining = (formData: FormData): void => {
        addTrainingAPI(
            formData.get('training-name').toString(),
            new Date((formData.get('training-date').toString())));
        setShowModal(false);
    }

    const copyTraining = async (e: React.MouseEvent<HTMLSpanElement>, trainingId: Object): Promise<void> => {
        e.preventDefault();
        e.stopPropagation();

        const training = trainings.find(t => t._id === trainingId);

        if (!training) {
            console.error('Training not found');
            return;
        }

        let promiseNewExercises: Promise<AxiosResponse<ExerciseType[], any>>[] = [];
        addTrainingAPI(
            training.trainingName + ' - Copy',
            new Date()
        ).then((newTraining) => {
            training.exercises.map((exercise) => (exercise.name)).filter((value, index, self) => self.indexOf(value) === index).forEach(exerciseName => {
                promiseNewExercises.push(ExerciseService.createExercise(groupId as string, newTraining._id.toString(), exerciseName))
            });

            Promise.all(promiseNewExercises)
            .then((exercisesResponses) => {
                let newExercises: ExerciseType[] = exercisesResponses.flatMap((response) => response.data);
                console.log('New Exercises:', newExercises);

                // Passing a function here queues the state update to be based on the previous state in queue
                // This is important
                setTrainings(trainings => trainings.map(training => {
                    if (training._id === newTraining._id) {
                        return {
                            ...training,
                            exercises: newExercises
                        };
                    } else {
                        return training;
                    }
                }));
            })

        })            
        .catch((error) => {
            console.error('Error copying training:', error)
            });
    }

    const deleteTraining = (e: React.MouseEvent<HTMLSpanElement>, trainingId: Object) => {
        e.preventDefault();
        e.stopPropagation();

        deleteTrainingAPI(trainingId.toString())
            .then((training) => {
                setTrainings(trainings.filter((t) => t._id !== training._id));
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
                    trainings.map((training) => (
                        <Link key={`${training._id}`} className='training-row' to={window.location.href + `/training/${training._id}`}>
                            <div className='training-header' onClick={(e) => {e.preventDefault(); e.stopPropagation();}}>
                                <span className='text-box'>{training.trainingName}</span>
                                <span className='text-box'>{new Date(training.date).toLocaleDateString('pl-PL', {year: "2-digit", month: "numeric", day: "2-digit"})}</span>
                                <span className='text-box' onClick={(e) => {e.preventDefault(); e.stopPropagation();}}>
                                    <span className='copy-box' onClick={(e) => copyTraining(e, training._id)}><IoCopy/></span>
                                    <span className='delete-box' onClick={(e) => deleteTraining(e, training._id)}><CgCloseR /></span>
                                </span>
                            </div>
                            {training.exercises.length > 0 && 
                            <div className='training-exercises'>
                                {training.exercises.map((exercise) => (exercise.name)).filter((value, index, self) => self.indexOf(value) === index).map((exerciseName: string) => (
                                    <span key={exerciseName} className='exercise-box'>{exerciseName}</span>
                                ))}
                            </div>}
                        </Link>
                    ))
                }
                <div className='training-row pseudo-link' onClick={() => setShowModal(true)}><span className='add-training' /></div>
            </div>
        </>
    )
}

export default GroupView;