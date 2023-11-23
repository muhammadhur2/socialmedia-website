import React, { useState } from 'react';
// import AppBar from '../Components/AppBar/AppBar';  // Adjust the path if needed
import AppBar_material from '../Components/AppBar_Material/AppBar';  // Adjust the path if needed
// import Profile from '../Components/Profile_Material/Profile';  // Adjust the path if needed
import FriendsPage from '../Components/Friends/Friends';
import TemporaryDrawer from '../Components/sidebar_material/sidebar'


const FriendPage = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };
  return (
    <div>
      <AppBar_material toggleDrawer={toggleDrawer} />
      <TemporaryDrawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <FriendsPage />
    </div>
  );
};

export default FriendPage;
