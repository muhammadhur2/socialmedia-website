import React, { useState } from 'react';
import AppBar_material from '../Components/AppBar_Material/AppBar';
import Feed_Tags from '../Components/Feed/Feed_Tags'; // Adjust the import path as necessary
import { useParams } from 'react-router-dom';
import TemporaryDrawer from '../Components/sidebar_material/sidebar';

const TagFeedPage = () => {
  const { tag } = useParams();
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar_material toggleDrawer={toggleDrawer} />
      <TemporaryDrawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', padding: '0 20px' }}> 
        {/* Padding added for potential spacing, adjust as needed */}
        <Feed_Tags tag={tag} style={{ width: '100%', maxWidth: '1000px' }} />
        {/* Width and maxWidth ensure the component's size, adjust maxWidth as needed */}
      </div>
    </div>
  );
};

export default TagFeedPage;
