import React, { useState } from 'react';
import AppBar_material from '../Components/AppBar_Material/AppBar';  // Adjust the path if needed
import Feed from '../Components/Feed/Feed';  // Adjust the path if needed

import TemporaryDrawer from '../Components/sidebar_material/sidebar'
const FeedPage = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };
  return (
    <div>
      <AppBar_material toggleDrawer={toggleDrawer} />
      <TemporaryDrawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <Feed />
    </div>
  );
};

export default FeedPage;
