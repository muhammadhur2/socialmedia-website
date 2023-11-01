import React, { useContext, useState, useEffect } from 'react';
import userService from '../../Services/UserService';
import UserContext from '../../UserContext';

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: '', email: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      if (user && user.token) {
        try {
          const response = await userService.getProfile(user.token);
          if (response.data.status === 'ok') {
            setProfileData(response.data.user);
            setEditData({ name: response.data.user.name, email: response.data.user.email });
          }
        } catch (error) {
          console.error("Error fetching profile", error);
        }
      }
    };
    fetchProfile();
  }, [user]);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const response = await userService.updateProfile(editData, user.token);
      if (response.data.status === 'ok') {
        setProfileData(response.data.user);
        setUser({ ...user, ...response.data.user });
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  return (
    <div>
      {isEditing ? (
        <>
          <h2>Edit Profile</h2>
          <input
            type="text"
            name="name"
            value={editData.name}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            value={editData.email}
            onChange={handleInputChange}
          />
          <button onClick={handleUpdate}>Save Changes</button>
          <button onClick={handleEdit}>Cancel</button>
        </>
      ) : profileData ? (
        <>
          <h2>{profileData.name}'s Profile</h2>
          <p>Email: {profileData.email}</p>
          <button onClick={handleEdit}>Edit Profile</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
