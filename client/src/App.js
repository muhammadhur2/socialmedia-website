import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginSignup from './Components/LoginSignup/LoginSignup';
import Profile from './Components/Profile/Profile';
import UserContext from './UserContext';  // import UserContext

function App() {
  const token = localStorage.getItem('token');
  const [user, setUser] = useState(token ? { token } : null);
  console.log("User state in App:", user);


  return (
    <UserContext.Provider value={{ user, setUser }}>  {/* Provide the context */}
      <Router>
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="*" element={<LoginSignup />} /> {/* Fallback route */}
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;