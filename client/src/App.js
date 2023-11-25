import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom';

import LoginPage from './Pages/LoginPage';  // Adjust the path if needed
import ProfilePage from './Pages/ProfilePage';  // Adjust the path if needed
import FriendsPage from './Pages/FriendsPage';
import ChallengePage from './Pages/ChallengePage';  // Adjust the path if needed
import CreateChallengePage from './Pages/CreateChallengePage';
import ListChallengesPage from './Pages/ListChallengesPage';
import UserContext from './UserContext';  // import UserContext


import PrivateRoute from './Routes/PrivateRoute'; // Adjust the path if needed
import PublicRoute from './Routes/PublicRoute'; // Adjust the path if needed

function App() {
  const token = localStorage.getItem('token');
  const [user, setUser] = useState(token ? { token } : null);
  console.log("User state in App:", user);
// dummy change
  return (
    <UserContext.Provider value={{ user, setUser }}>  {/* Provide the context */}
      <Router>
      <Routes>
      <Route 
            path="/profile/:userId" 
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            } 
          />
  <Route 
    path="/friends" 
    element={
      <PrivateRoute>
        <FriendsPage />
      </PrivateRoute>
    } 
  />
  <Route 
    path="/createchallenge" 
    element={
      <PrivateRoute>
        <CreateChallengePage />
      </PrivateRoute>
    } 
  />
  <Route 
    path="/challenge" 
    element={
      <PrivateRoute>
        <ListChallengesPage />
      </PrivateRoute>
    } 
  />
  <Route 
  path="/challenge/:challengeId" 
  element={
    <PrivateRoute>
      <ChallengePage />
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
