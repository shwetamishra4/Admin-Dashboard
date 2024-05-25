import React from 'react'

import BookTable from './BookTable'

function Home() {
    
  return (
    <main className='main-container'>
        
        <div className='main-title'>
            <h3>DASHBOARD : BOOKS RECORD</h3>
            {/* {userEmail && <p>Welcome,  {userEmail}</p>} */}
           
        </div>

        <div >
        <BookTable/>
        </div>
        
    </main>
  )
}

export default Home