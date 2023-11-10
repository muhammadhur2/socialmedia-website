import React, { useContext, useState, useEffect } from 'react';
import userService from '../../Services/UserService';
import UserContext from '../../UserContext';
import { useNavigate } from 'react-router-dom';
import { isValidEmail, isValidPassword, isValidName } from '../../utils/Validation';
import './Profile.css';

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: '', email: '', newPassword: '', confirmPassword: '' });
  const navigate = useNavigate();

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

  const handleEdit = () => setIsEditing(!isEditing);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const response = await userService.updateProfile(editData, user.token);
      if (!isValidName(editData.name)) {
        window.alert('Name should be at least 2 characters.');
        return;
      }
      if (!isValidEmail(editData.email)) {
        window.alert('Please enter a valid email address.');
        return;
      }
      if (editData.newPassword || editData.confirmPassword) {
        if (!isValidPassword(editData.newPassword)) {
          window.alert('Password should be at least 6 characters long.');
          return;
        }
        if (editData.newPassword !== editData.confirmPassword) {
          window.alert('Passwords do not match.');
          return;
        }
      }
      if (response.data.status === 'ok') {
        setProfileData(response.data.user);
        setUser({ ...user, ...response.data.user });
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating profile", error);
    }
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
  
  

  return (
    <div className="container">
      <div className='header'>
        <div className='text'>{isEditing ? 'Edit Profile' : `${profileData ? profileData.name + "'s Profile" : ''}`}</div>
        <div className='underline'></div>
      </div>
      <div className='profile-content'>
        {isEditing ? (
        <div className="profile-edit">
        <h2>Edit Profile</h2>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={editData.name}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={editData.email}
          onChange={handleInputChange}
        />
        <label htmlFor="newPassword">New Password</label>
        <input
          id="newPassword"
          type="password"
          name="newPassword"
          value={editData.newPassword}
          onChange={handleInputChange}
        />

        <label htmlFor="confirmPassword">Confirm New Password</label>
        <input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          value={editData.confirmPassword}
          onChange={handleInputChange}
        />

<button onClick={handleUpdate} className="save-changes">Save Changes</button>
        <button onClick={handleEdit} className="cancel">Cancel</button>
      </div>
    
        ) : profileData ? (
          <div className="profile-view">
            <p><strong>Email:</strong> {profileData.email}</p>
            <div className="profile-actions">
              <button onClick={handleEdit} className="submit">Edit Profile</button>
              <button onClick={handleDeleteAccount} className="danger">Delete Account</button>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;

