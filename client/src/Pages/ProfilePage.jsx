import React from 'react';
import AppBar from '../Components/AppBar/AppBar';  // Adjust the path if needed
import Profile from '../Components/Profile_Material/Profile';  // Adjust the path if needed

const ProfilePage = () => {
  return (
    <div>
      <AppBar />  {/* Adding the AppBar here */}
      <Profile />
    </div>
  );
};

export default ProfilePage;
