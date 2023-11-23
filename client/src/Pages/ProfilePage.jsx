import React, { useState } from 'react';
import AppBar_material from '../Components/AppBar_Material/AppBar';  // Adjust the path if needed
import Profile from '../Components/Profile3/Profile';  // Adjust the path if needed

import TemporaryDrawer from '../Components/sidebar_material/sidebar'
const ProfilePage = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };
  return (
    <div>
      <AppBar_material toggleDrawer={toggleDrawer} />
      <TemporaryDrawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <Profile />
    </div>
  );
};

export default ProfilePage;
