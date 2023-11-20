import React from 'react';
// import AppBar from '../Components/AppBar/AppBar';  // Adjust the path if needed
import AppBar_material from '../Components/AppBar_Material/AppBar';  // Adjust the path if needed
// import Profile from '../Components/Profile_Material/Profile';  // Adjust the path if needed
import FriendsPage from '../Components/Friends/Friends';

const ProfilePage = () => {
  return (
    <div>
      <AppBar_material />  {/* Adding the AppBar here */}
      <FriendsPage />
    </div>
  );
};

export default ProfilePage;