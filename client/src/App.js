import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginPage from './Pages/LoginPage';  // Adjust the path if needed
import ProfilePage from './Pages/ProfilePage';  // Adjust the path if needed
import UserContext from './UserContext';  // import UserContext

function App() {
  const token = localStorage.getItem('token');
  const [user, setUser] = useState(token ? { token } : null);
  console.log("User state in App:", user);

  return (
    <UserContext.Provider value={{ user, setUser }}>  {/* Provide the context */}
      <Router>
        <Routes>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<LoginPage />} /> {/* Fallback route */}
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
