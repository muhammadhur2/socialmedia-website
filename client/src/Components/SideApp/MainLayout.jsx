import React from 'react';
import Box from '@mui/material/Box';
import AppBar from '../AppBar_Material/AppBar';
import Sidebar from '../sidebar_material/sidebar';

const drawerWidth = 240;

const MainLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AppBar />
      <Box sx={{ display: 'flex', width: '100%', mt: 8 }}> {/* Adjust marginTop to match AppBar height */}
        <Box component="nav" sx={{ width: drawerWidth }}>
          <Sidebar />
        </Box>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
