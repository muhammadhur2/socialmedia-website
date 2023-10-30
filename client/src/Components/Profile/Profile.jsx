import React, { useContext, useState, useEffect } from 'react';
import userService from '../../Services/UserService';
import UserContext from '../../UserContext';

const Profile = () => {
  const { user } = useContext(UserContext);
  const [profileData, setProfileData] = useState(null);

  console.log("User Context:", user); // To check the value from the context

  useEffect(() => {
    const fetchProfile = async () => {
      // Safety check to see if user and user.token exist
      if (user && user.token) {
        console.log("Attempting to fetch profile with token:", user.token);
        try {
          const response = await userService.getProfile(user.token);
          console.log("API Response:", response.data); // Log the API response

          if (response.data.status === 'ok') {
            setProfileData(response.data.user);
          } else {
            console.error("Error fetching profile", response.data.error);
          }
        } catch (error) {
          console.error("Error fetching profile", error);
        }
      } else {
        console.warn("User or user token missing."); // Added this for clarity
      }
    };
    
    fetchProfile();
  }, [user]);

  return (
    <div>
      {profileData ? (
        <>
          <h2>{profileData.name}'s Profile</h2>
          <p>Email: {profileData.email}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
