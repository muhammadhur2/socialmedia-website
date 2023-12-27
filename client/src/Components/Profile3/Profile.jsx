import React, { useContext, useState, useEffect } from 'react';
import styles from './Profile.module.css';
import { Box, Button, Card, CardContent, CardMedia, Container, Grid, Typography, TextField } from '@mui/material';
import userService from '../../Services/UserService';
import UserContext from '../../UserContext';
import { useParams, useNavigate } from 'react-router-dom';
import Feed from '../Feed/My_Posts';  // Adjust the path if needed
import ChallengeService from '../../Services/ChallengesServices';
import { Skeleton } from '@mui/material';



export default function ProfilePage() {
  const { userId } = useParams(); // Get the user identifier from URL
  console.log(userId)

  const { user, setUser } = useContext(UserContext);
  const [numberofPosts, setNumberofPosts] = useState(null);
  const [profileData, setProfileData] = useState({ name: '', email: '', about: '', profilePicture: '', friends: '' });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: '', email: '', about: '' });
  const [selectedImage, setSelectedImage] = useState(null);

  const navigate = useNavigate();

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileUserId = userId || user?.id; 
        const token = user?.token;
        const response = await userService.getProfile(profileUserId, token);

        const responses = await ChallengeService.getChallengesByAuthor(response.data.user?.userId || response.data.user._id, token);


        // Check if challenges data is available
        setNumberofPosts(responses.data.challenges?.length);
        if (response.data.status === 'ok') {
          setLoading(false);
          setProfileData(response.data.user);
          setEditData({
            name: response.data.user.name,
            email: response.data.user.email,
            about: response.data.user.about
          }); 
        }
      } catch (error) {
        console.error("Error in fetchProfile:", error);
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
    const formData = new FormData();
    formData.append('name', editData.name);
    formData.append('email', editData.email);
    formData.append('about', editData.about);
    if (selectedImage) {
      formData.append('profilePicture', selectedImage);
    }

    try {
      const response = await userService.updateProfile(formData, user.token);
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
                {
                  loading ? (
                    <div>
                      
                      <Skeleton variant="circle" width={100} height={100} className={styles.profilePictureBoxLoading} />
                    </div>
                  ) : isEditing ? (
                    <div className={styles.profilePictureBox}>
                      {profileData.profilePicture ? (
                        <img
                          src={profileData.profilePicture}
                          alt="Profile"
                          className={styles.profilePicture}
                        />
                      ) : (
                        <img
                          src="https://skillsphere-pics.s3.amazonaws.com/default-placeholder-profile-icon-avatar-gray-man-90197957.webp"
                          alt="Default Avatar"
                          className={styles.profilePicture}
                        />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'block', marginTop: '20px', color:'#fff'}}
                      />
                    </div>
                  ) : (
                    <Box className={styles.profilePictureBox}>
                      <CardMedia
                        component="img"
                        image={profileData.profilePicture || "https://skillsphere-pics.s3.amazonaws.com/default-placeholder-profile-icon-avatar-gray-man-90197957.webp"}
                        alt="Profile avatar"
                        className={styles.profilePicture}
                      />
                    </Box>
                  )
                }

                {
                  loading ? (
                    <Skeleton variant="rectangular" width={300} height={60} className={styles.userNameBoxLoading} style={{ background: 'grey' }} />


                  ) :
                    (
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
                            InputProps={{ style: { color: '#FFFFFF', borderBottom: '1px solid white' } }} // Set the width to auto or another value that fits
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
                    )}
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
                        <Typography variant="h5">{profileData.friends?.length}</Typography>
                        <Typography variant="caption">Friends</Typography>
                      </Grid>
                      <Grid item className={styles.statItem}>
                        <Typography variant="h5">{numberofPosts}</Typography>
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
                  {isEditing ? (
                    <TextField
                      variant="outlined"
                      multiline
                      rows={4}
                      value={editData.about}
                      onChange={handleInputChange}
                      name="about"
                      fullWidth
                      margin="normal"
                    />
                  ) : (
                    <Typography variant="body1" color="textSecondary" className="font-italic mb-1">
                      {profileData.about}
                    </Typography>
                  )}
                </Box>
                <Box className={styles.recentPhotosHeader} sx={{ mb: 4 }}>
                  <Typography variant="h6">Posts</Typography>
                  <Typography component="a" href="#!" color="primary">
                    Show all
                  </Typography>
                </Box>
                {/* <Grid container spacing={2}>
                 
                  <Grid item xs={6} className={styles.imageItem}>
                    <CardMedia
                      component="img"
                      image="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                      alt="image 1"
                    />
                  </Grid>
                 
                </Grid> */}
                <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                  <Feed />
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
