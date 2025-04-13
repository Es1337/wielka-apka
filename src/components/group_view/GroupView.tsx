import { Link } from 'react-router-dom'
import Menu from '../menu/Menu'
import './GroupView.css'
import React from 'react'

const GroupView: React.FC = () => {
    const trainings = [
        { id: 1, date: "31.03.2025", title: "Training 1" },
        { id: 2, date: "01.04.2025", title: "Training 2" },
    ]

    return (
        <>
            <Menu/>
                <div className='training-container'>
                    {
                        Object.values(trainings).map((training) => (
                            <Link className='training-row' to={window.location.href + `/training/${training.id}`}>
                                <span className='text-box'>{training.title}</span>
                                <span className='text-box'>{training.date}</span>
                            </Link>
                        ))
                    }
                    <div className='training-row pseudo-link'><span className='add-training'/></div>
                </div>
        </>
    )
}

export default GroupView;