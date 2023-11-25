import * as React from 'react';
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

import { useNavigate } from 'react-router-dom'; // import useNavigate


export default function TemporaryDrawer({ isOpen, toggleDrawer }) {
    const navigate = useNavigate(); // hook to navigate

    const handleNavigation = (path) => {
        toggleDrawer(false); // Close the drawer on navigation
        navigate(path); // Navigate to the path
      };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => toggleDrawer(false)}
      onKeyDown={() => toggleDrawer(false)}
    >
      <List>
        {['Friends', 'Challenges', 'Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
           <ListItemButton onClick={() => {
              // Navigate based on the text
              if (text === 'Friends') handleNavigation('/friends');
              if (text === 'Challenges') handleNavigation('/challenge');
            }}>
<ListItemIcon>
{/* Conditionally render icons */}
{text === 'Friends' && <PeopleAltOutlinedIcon />}
                {text === 'Challenges' && <FitnessCenterOutlinedIcon />}
                {/* Add other icons for other list items as needed */}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer
      anchor='left'
      open={isOpen}
      onClose={() => toggleDrawer(false)}
    >
      {list()}
    </Drawer>
  );
}
