import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import FitnessCenterOutlinedIcon from '@mui/icons-material/FitnessCenterOutlined';
import { useNavigate } from 'react-router-dom';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';

const drawerWidth = 240;

export default function PermanentDrawer() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const list = () => (
    <Box
      sx={{ width: drawerWidth }}
      role="presentation"
    >
      <List>
        {[' ', ' ',' ','Feed', 'Friends', 'Create Challenge'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleNavigation('/' + text.toLowerCase().replace(/\s+/g, ''))}>
              <ListItemIcon>
                {text === 'Feed' && <DynamicFeedIcon />}
                {text === 'Friends' && <PeopleAltOutlinedIcon />}
                {text === 'Create Challenge' && <FitnessCenterOutlinedIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <Drawer
      variant="permanent"
      open
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      {list()}
    </Drawer>
  );
}
