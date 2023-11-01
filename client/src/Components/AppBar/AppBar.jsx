import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../UserContext'; // Adjust path as needed
import './AppBar.css';

const AppBar = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="app-bar">
      <div className="app-bar-container">
        <button className="sign-out-button" onClick={handleSignOut}>Sign Out</button>
      </div>
    </div>
  );
};

export default AppBar;
