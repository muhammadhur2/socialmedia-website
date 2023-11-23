import React from 'react';
import AppBar_material from '../Components/AppBar_Material/AppBar';  // Adjust the path if needed
import Profile from '../Components/Profile3/Profile';  // Adjust the path if needed

const ProfilePage = () => {
  return (
    <div>
      <AppBar_material />  {/* Adding the AppBar here */}
      <Profile />
    </div>
  );
};

export default ProfilePage;
