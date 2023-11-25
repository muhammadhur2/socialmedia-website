import React, { useContext, useState, useEffect } from 'react';
import styles from './Profile.module.css';
import { Box, Button, Card, CardContent, CardMedia, Container, Grid, Typography, TextField } from '@mui/material';
import userService from '../../Services/UserService';
import UserContext from '../../UserContext';
import { useParams, useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const { userId } = useParams(); // Get the user identifier from URL
  console.log(userId)

  const { user, setUser } = useContext(UserContext);
  const [profileData, setProfileData] = useState({ name: '', email: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileUserId = userId || user.id; // Use URL userId or fallback to logged-in user's id
        const response = await userService.getProfile(profileUserId, user.token);
        if (response.data.status === 'ok') {
          setProfileData(response.data.user);
        }
      } catch (error) {
        console.error("Error fetching profile", error);
      }
    };
    if (user && user.token) {
      fetchProfile();
    }
  }, [userId, user]);

  const handleEditClick = () => {
    if (isEditing) {
      handleUpdate();
    } else {
      setIsEditing(true);
    }
  };

  const handleUpdate = async () => {
    // Validation logic here
    try {
      const response = await userService.updateProfile(editData, user.token);
      if (response.data.status === 'ok') {
        setProfileData(editData); // Update the profile data with the new name and email
        setUser({ ...user, ...editData }); // Update the user context if needed
        setIsEditing(false); // Exit editing mode
      } else {
        // Handle the error if the update is not successful
        alert('Failed to update profile.');
      }
    } catch (error) {
      console.error("Error updating profile", error);
      alert('An error occurred while updating the profile.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };
  
  const handleDeleteAccount = async () => {
    // Confirm with the user before deleting the account
    if (window.confirm('Are you sure you want to delete your account? This cannot be undone.')) {
      try {
        const response = await userService.deleteAccount(user.token);
        console.log("Response from deleteAccount:", response.data);
        if (response.data.status === 'ok') {
          console.log("Removing token from localStorage");
          localStorage.removeItem('token');
          
          console.log("Setting user to null");
          setUser(null);
          
          console.log("Navigating to login");
          navigate('/login');
        }
      } catch (error) {
        console.error("Error deleting account", error);
      }
    }
  };

  const isOwnProfile = user && user.id === userId;

  return (
    <Box className={styles.gradientCustom} sx={{ py: 5, height: '100vh' }}>
      <Container>
        <Grid container justifyContent="center" alignItems="center" style={{ height: '100%' }}>
          <Grid item lg={9} xl={7}>
            <Card>
              <Box className={styles.cardHeader}>
                <Box className={styles.profilePictureBox}>
                  <CardMedia
                    component="img"
                    image={profileData.image || "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"}
                    alt="Profile avatar"
                    className={styles.profilePicture}
                  />
                </Box>
                <Box className={styles.userNameBox}>
                  {isEditing ? (
                    <TextField
                      variant="standard"
                      value={editData.name}
                      onChange={handleInputChange}
                      name="name"
                      placeholder="Name"
                      fullWidth
                      margin="normal"
                      InputProps={{ style: { color: '#FFFFFF' , borderBottom: '1px solid white'} }} // Set the width to auto or another value that fits
                      className={styles.editInputName}
                    />
                  ) : (
                    <Typography variant="h5" color="#FFFFFF">
                      {profileData.name}
                    </Typography>
                  )}
                  {isEditing ? (
                    <TextField
                      variant="standard"
                      value={editData.email}
                      onChange={handleInputChange}
                      name="email"
                      placeholder="Email"
                      fullWidth
                      margin="normal"
                      InputProps={{ style: { color: '#FFFFFF', borderBottom: '1px solid white' } }}
                      className={styles.editInputEmail}
                    />
                  ) : (
                    <Typography color="#FFFFFF">{profileData.email}</Typography>
                  )}
                </Box>
              </Box>
              <Box className={styles.statsBox}>
              
  <Grid container justifyContent="space-between" alignItems="center">
  {isOwnProfile && (
    <Grid item>
      <Button onClick={handleEditClick} variant="outlined" color="inherit" className={styles.editButton}>
        {isEditing ? 'Save' : 'Edit Profile'}
      </Button>
      {/* Add some spacing between buttons */}
      <Box mx={2} display="inline-block"> {/* mx is for margin on the x-axis, you can adjust the number as needed */}
      <Button
  onClick={handleDeleteAccount}
  variant="contained"
  style={{ backgroundColor: 'red', color: 'white' }} // Inline style for red background
  className={styles.deleteButton}
>
  Delete Account
</Button>

      </Box>
    </Grid>
    )}

    {/* ...other grid items... */}
    <Grid item>
  <Grid container justifyContent="flex-end" alignItems="center" textAlign="center" spacing={2}> {/* Adjust the spacing value as needed */}
    <Grid item className={styles.statItem}>
      <Typography variant="h5">123</Typography>
      <Typography variant="caption">Friends</Typography>
    </Grid>
    <Grid item className={styles.statItem}>
      <Typography variant="h5">456</Typography>
      <Typography variant="caption">Posts</Typography>
    </Grid>
  </Grid>
</Grid>
  </Grid>
</Box>

              {/* ...CardContent and other components... */}
              <CardContent>
                <Box className={styles.aboutSection} sx={{ p: 4 }}>
                  <Typography variant="h6">About</Typography>
                  <Typography variant="body1" color="textSecondary" className="font-italic mb-1">
                    Web Developer
                  </Typography>
                  <Typography variant="body1" color="textSecondary" className="font-italic mb-1">
                    Lives in New York
                  </Typography>
                  <Typography variant="body1" color="textSecondary" className="font-italic mb-0">
                    Photographer
                  </Typography>
                </Box>
                <Box className={styles.recentPhotosHeader} sx={{ mb: 4 }}>
                  <Typography variant="h6">Recent photos</Typography>
                  <Typography component="a" href="#!" color="primary">
                    Show all
                  </Typography>
                </Box>
                <Grid container spacing={2}>
                  {/* Repeat this Grid item for each image */}
                  <Grid item xs={6} className={styles.imageItem}>
                    <CardMedia
                      component="img"
                      image="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                      alt="image 1"
                    />
                  </Grid>
                  {/* ... other images */}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
