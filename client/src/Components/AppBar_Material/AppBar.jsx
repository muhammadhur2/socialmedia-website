import React, { useState, useEffect, useContext } from 'react';
import { styled, alpha } from '@mui/material/styles';
import {
  AppBar as MuiAppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  MenuItem,
  Menu,
  Avatar,
  CircularProgress,
  Popover
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  AccountCircle,
  Mail as MailIcon,
  Notifications as NotificationsIcon,
  MoreVert as MoreIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../UserContext';
import userService from '../../Services/UserService';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const AppBar = ({ toggleDrawer }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [searchPopoverAnchorEl, setSearchPopoverAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isSearchPopoverOpen = Boolean(searchPopoverAnchorEl);

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    if (searchResults.length > 0) {
      setSearchPopoverAnchorEl(searchTerm ? document.getElementById('search-input') : null);
    } else {
      setSearchPopoverAnchorEl(null);
    }
  }, [searchResults, searchTerm]);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  
    // Anchor the Popover only if it's not already open
    if (!isSearchPopoverOpen) {
      setSearchPopoverAnchorEl(event.currentTarget);
    }
  };
  

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const response = await userService.searchFriends(token, searchTerm);
      console.log(response.data.users);
      setSearchResults(response.data.users);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching search results', error);
      setIsLoading(false);
    }
  };

  const handleSearchPopoverClose = () => {
    setSearchPopoverAnchorEl(null);
  };

  const profileredirect = () => {
    navigate('/profile'); // Adjust the path as needed based on your routing setup
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={profileredirect}>Profile</MenuItem>
      <MenuItem onClick={handleSignOut}>Signout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>

    
  );



  const handleKeyPress = async (event) => {
    if (event.key === 'Enter') {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        const response = await userService.searchFriends(token, searchTerm);
        setSearchResults(response.data.users);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching search results', error);
        setIsLoading(false);
      }
    }
  };

  const homePageNav = () => {
    navigate('/');
  };
  
  const searchPopoverId = isSearchPopoverOpen ? 'search-popover' : undefined;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
  
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            SkillSphere
          </Typography>
  
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              id="search-input"
              placeholder="Search Friends…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
            />
          </Search>
  
          <Box sx={{ flexGrow: 1 }} />
  
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </MuiAppBar>
      {renderMobileMenu}
      {renderMenu}
  
      <Popover
        id={searchPopoverId}
        open={Boolean(searchPopoverAnchorEl)}
        anchorEl={searchPopoverAnchorEl}
        onClose={handleSearchPopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Box sx={{ p: 2 }}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            searchResults.map((user) => (
              <MenuItem key={user._id} onClick={() => navigate(`/profile/${user._id}`)}>
                <Avatar src={user.profilePicture} sx={{ width: 24, height: 24, mr: 2 }} />
                {user.name}
              </MenuItem>
            ))
          )}
        </Box>
      </Popover>
    </Box>
  );
  
};

export default AppBar;