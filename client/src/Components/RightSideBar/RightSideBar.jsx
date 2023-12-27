import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography'; // Import Typography for the title
import { useNavigate } from 'react-router-dom';
import UserContext from '../../UserContext';
import UserService from '../../Services/UserService';

const drawerWidth = 240;

export default function RightPermanentDrawer() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        if (user?.token) {
          const response = await UserService.listFriends(user.token);
          setFriends(response.data.friends);
        }
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    fetchFriends();
  }, [user]);

  const handleNavigation = (friendId) => {
    navigate(`/friend/${friendId}`);
  };

  return (
    <Drawer
      variant="permanent"
      open
      anchor="right"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Box sx={{ width: drawerWidth, pt: '50pt' }} role="presentation">
        <Typography variant="h6" sx={{ ml: 2, my: 2 }}>Contacts</Typography> {/* Title */}
        <Divider />
        <List>
          {friends.map((friend) => (
            <ListItem key={friend._id} disablePadding>
              <ListItemButton onClick={() => handleNavigation(friend._id)}>
                <ListItemAvatar>
                  <Avatar src={friend.profilePicture || '/path/to/default/avatar.jpg'} />
                </ListItemAvatar>
                <ListItemText primary={friend.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
