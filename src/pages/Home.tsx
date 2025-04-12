import React, { useEffect, useRef, useState } from "react";
import Group from "../components/Group";
import AddGroup from "../components/AddGroup";
import './Home.css'
import { Link } from "react-router-dom";
import Menu from "../components/menu/Menu";


const Home: React.FC = () => {
    type GroupType = {
        id: number,
        title: string
    }
    
    const groups = [
        { id: 1, title: "Group 1" },
        { id: 2, title: "Group 2" },
        { id: 3, title: "Group 3" }
    ];

    

    return (
        <>
            <Menu/>
            <ul className="container">
                {Object.values(groups).map((group: GroupType) => (
                        <li key={group.id}>
                            <Link to={`/group/${group.id}`}>
                                <Group />
                            </Link>
                        </li>
                    ))
                }
                <li><AddGroup/></li>
            </ul>
        </>
    )
}

export default Home;