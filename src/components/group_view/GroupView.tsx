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
            {
                Object.values(trainings).map((training) => (
                    <Link to={window.location.href + `/training/${training.id}`}>
                        <div>
                            <span>{training.title}</span>
                            <span>{training.date}</span>
                        </div>
                    </Link>
                ))
            }
            GroupView
        </>
    )
}

export default GroupView;