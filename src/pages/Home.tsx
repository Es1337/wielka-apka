import React, { useEffect, useRef, useState } from "react";
import Group from "../components/Group";
import AddGroup from "../components/AddGroup";
import './Home.css'

const groups = [
    { id: 1 },
    { id: 2 },
    { id: 3 }
]

const Home: React.FC = () => {
    const [sidebarToggled, setSidebarToggled] = useState(false)
    const sidebarRef = useRef(null)

    useEffect(() => {
        function sidebarCloseHandler(e: MouseEvent) {
        if (sidebarRef.current) {
            if (e.target instanceof HTMLElement 
            && !e.target.classList.contains('sidebar')
            && !e.target.classList.contains('sidebar-toggle')) {
            setSidebarToggled(false)
            }
        }
        }

        document.addEventListener("click", sidebarCloseHandler)

        return () => {
        document.removeEventListener("click", sidebarCloseHandler)
        }
    })

    return (
        <>
            <button className='sidebar-toggle' onClick={() => setSidebarToggled(true)}>Menu</button>
            <nav className={`${sidebarToggled ? 'visible' : ''} sidebar`} ref={sidebarRef}>
                Navbar
            </nav>

            <ul className="container">
                <li><Group/></li>
                <li><Group/></li>
                <li><Group/></li>
                <li><AddGroup/></li>
            </ul>
        </>
    )
}

export default Home;