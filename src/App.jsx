import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Home from './Home';
import LoginPage from './LoginPage';

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  //const [username, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleLogin = (email) => {
    setUserEmail(email);
    setLoggedIn(true);
  };


  return (
    <div className="grid-container">
      
      {loggedIn ? (
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      ) : null}
      {loggedIn ? (
        <Home userEmail={userEmail}/>
      ) : (
        <LoginPage onLogin={handleLogin}
        
            />
      )}
      {loggedIn ? (
        <Header OpenSidebar={OpenSidebar} userEmail={userEmail}  />
      ) : null}
      
    </div>
  );
}

export default App;
