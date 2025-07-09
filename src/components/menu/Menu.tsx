import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Menu: React.FC = () => {
    const [sidebarToggled, setSidebarToggled] = useState(false)
    const sidebarRef = useRef(null)
    const navigate = useNavigate();

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

    function goToProfile() {
        navigate('/profile');
        setSidebarToggled(false);
    }
    
    return (
        <>
            <button className='sidebar-toggle' onClick={() => setSidebarToggled(true)}>Menu</button>
            <nav className={`${sidebarToggled ? 'visible' : ''} sidebar`} ref={sidebarRef}>
                <button onClick={() => navigate(-1)}>Back</button>
                <button onClick={() => goToProfile()}>Profile</button>
            </nav>
        </>
    )
};

export default Menu;