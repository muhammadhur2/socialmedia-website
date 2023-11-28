
import Feed_Tags from '../Components/Feed/Feed_Tags'; // Adjust the import path as necessary
import React, { useState } from 'react';
import AppBar_material from '../Components/AppBar_Material/AppBar';  // Adjust the path if needed
import { useParams } from 'react-router-dom';

import TemporaryDrawer from '../Components/sidebar_material/sidebar'
const TagFeedPage = () => {
  // The tag prop should be passed down from the parent component or extracted from the URL
  const { tag } = useParams(); // Extract the tag from the URL

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };
  return (
    <div>
      {/* You could also add a header or any other page elements here */}
      <AppBar_material toggleDrawer={toggleDrawer} />
      <TemporaryDrawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <Feed_Tags tag={tag} />
    </div>
  );
};

export default TagFeedPage;
