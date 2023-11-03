import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom';

import LoginPage from './Pages/LoginPage';  // Adjust the path if needed
import ProfilePage from './Pages/ProfilePage';  // Adjust the path if needed
import UserContext from './UserContext';  // import UserContext

import PrivateRoute from './Routes/PrivateRoute'; // Adjust the path if needed
import PublicRoute from './Routes/PublicRoute'; // Adjust the path if needed

function App() {
  const token = localStorage.getItem('token');
  const [user, setUser] = useState(token ? { token } : null);
  console.log("User state in App:", user);

  return (
    <UserContext.Provider value={{ user, setUser }}>  {/* Provide the context */}
      <Router>
      <Routes>
  <Route 
    path="/profile" 
    element={
      <PrivateRoute>
        <ProfilePage />
      </PrivateRoute>
    } 
  />
  <Route 
    path="/login" 
    element={
      <PublicRoute redirectTo="/profile">
        <LoginPage />
      </PublicRoute>
    } 
  />
  <Route path="*" element={<Navigate to="/login" />} />
</Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
