import React from 'react'
import 
 {BsPersonCircle, BsSearch, BsJustify}
 from 'react-icons/bs'

function Header({OpenSidebar,userEmail}) {
    return (            
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='header-left'>
            <BsSearch  className='icon'/>
        </div>
        <div className='header-right'>
           {userEmail && <p>Welcome,  {userEmail}  <BsPersonCircle className='icon'/></p>}
    
        </div>
    </header>
    )
}

export default Header
