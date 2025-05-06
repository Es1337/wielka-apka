import { Link, useLocation, useParams } from 'react-router-dom'
import Menu from '../menu/Menu'
import './GroupView.css'
import React, { useEffect, useState } from 'react'
import Modal from '../modal/Modal'
import API from '../../api'
import { AxiosResponse } from 'axios'

const GroupView: React.FC = () => {
    const [showModal, setShowModal] = useState(false)
    const [trainings, setTrainings] = useState([
        { id: 1, date: "31.03.2025", title: "Training 1" },
        { id: 2, date: "01.04.2025", title: "Training 2" },
    ])
    const { groupId } = useParams();

    const [groupName, setGroupName] = useState('');

    type GoogleUser = {
        _id: Object,
        email: string,
        __v: number,
        name: string,
        picture: string
    }

    type GroupResponse = {
        _id: Object,
        groupName: string,
        date: Date,
        users: GoogleUser[]
    }
    
    useEffect(() => {
        async function getGroupData() {
            let group: AxiosResponse;
            try {
                group = await API.get("/group/" + groupId);
                let payload: GroupResponse = group.data;
                console.log(payload);
                setGroupName(payload.groupName);
            } catch (e) {
                console.error('Failure fetching group with id:', groupId);
            }
        }
        getGroupData();
    }, []);

    function addTraining(formData: FormData) {
        setTrainings((trainings) => ([
            ...trainings,
            { 
                id: 3, 
                date: formData.get('training-date').toString(), 
                title: formData.get('training-name').toString()
            }
        ]))
    }


    return (
        <>
            <Menu/>
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
                <h2>{groupId}</h2>
                <h2>{groupName}</h2>
                {
                    Object.values(trainings).map((training) => (
                        <Link className='training-row' to={window.location.href + `/training/${training.id}`}>
                            <span className='text-box'>{training.title}</span>
                            <span className='text-box'>{training.date}</span>
                        </Link>
                    ))
                }
                <div className='training-row pseudo-link' onClick={() => setShowModal(true)}><span className='add-training'/></div>
            </div>
        </>
    )
}

export default GroupView;