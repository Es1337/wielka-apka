import React from 'react';
import './Group.css'

type GroupProps = {
    groupName: string;
}

const Group: React.FC<GroupProps> = ({groupName}) => {
    return (
        <div className="group-card">
            <h2>{groupName}</h2>
            <img src="https://placehold.co/200x200" alt="Group Photo"/>
        </div>
    )
}

export default Group;