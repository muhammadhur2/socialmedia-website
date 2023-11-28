import React, { useState } from 'react';
import AppBar_material from '../Components/AppBar_Material/AppBar';  // Adjust the path if needed
import Feed from '../Components/Feed/Feed';  // Adjust the path if needed
import TemporaryDrawer from '../Components/sidebar_material/sidebar';

const FeedPage = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar_material toggleDrawer={toggleDrawer} />
      <TemporaryDrawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      {/* Removed alignItems to center only horizontally */}
      <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}> 
        <Feed />
      </div>
    </div>
  );
};

export default FeedPage;
