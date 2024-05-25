import React from 'react'

import 
{ BsGrid1X2Fill, BsBookFill, BsFillGrid3X3GapFill, BsPeopleFill, 
   BsFillGearFill}
 from 'react-icons/bs'

function Sidebar({openSidebarToggle, OpenSidebar}) {
    return (
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <BsPeopleFill  className='icon_header'/> ADMIN DASHBOARD  X
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                
                    <BsGrid1X2Fill className='icon'/> Dashboard
                
            </li>
            <li className='sidebar-list-item'>
                
                    <BsBookFill className='icon'/> Books
               
            </li>
            <li className='sidebar-list-item'>
                
                    <BsFillGrid3X3GapFill className='icon'/> Categories
               
            </li>
           
            
           
            <li className='sidebar-list-item'>
                
                    <BsFillGearFill className='icon'/> Setting
                
            </li>
        </ul>
    </aside>
    )
}

export default Sidebar
