import React, { useEffect, useRef, useState } from 'react';

const Menu: React.FC = () => {
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
        </>
    )
};

export default Menu;