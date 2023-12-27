import { useNavigate } from 'react-router-dom';
import React, { useContext, useState, useEffect } from 'react';
import userService from '../../Services/UserService';
import UserContext from '../../UserContext';
import './Friends.css';

const FriendsPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [friends, setFriends] = useState([]);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);


  
  useEffect(() => {
    fetchFriends();
    fetchIncomingRequests();
  }, [user]);

  const fetchFriends = async () => {
    try {
      const response = await userService.listFriends(user.token);
      if (response.data.status === 'ok') {
        setFriends(response.data.friends);
      } else {
        console.error('Error fetching friends:', response.data.error);
      }
    } catch (error) {
      console.error("Error fetching friends", error);
    }
  };

  const navigateToProfile = (friendId) => {
    // Navigate to friend's profile page
    navigate(`/profile/${friendId}`);
  };

  const fetchIncomingRequests = async () => {
    try {
      const response = await userService.listFriendRequests(user.token);
      if (response.data.status === 'ok') {
        setIncomingRequests(response.data.incomingRequests);
      } else {
        console.error('Error fetching incoming requests:', response.data.error);
      }
    } catch (error) {
      console.error("Error fetching incoming requests", error);
    }
  };

  const handleSearch = async () => {
    const token = user?.token;
    const response2 = await userService.getProfile(user?.id, token);
    console.log(response2.data.user._id)
    if (!searchQuery) {
        return; // Optionally handle empty search query
    }

    try {
      
        const response = await userService.searchFriends(user.token, searchQuery);
        if (response.data.status === 'ok') {
            const filteredResults = response.data.users.filter(u => 
                u._id !== response2.data.user._id && !friends.some(friend => friend._id === u._id)
            );
            setSearchResults(filteredResults);
        } else {
            console.error('Error searching friends:', response.data.error);
            // Optionally handle error in UI
        }
    } catch (error) {
        console.error("Error searching friends", error);
        // Optionally handle error in UI
    }
};

  const defaultProfilePic = 'https://skillsphere-pics.s3.amazonaws.com/default-placeholder-profile-icon-avatar-gray-man-90197957.webp';

  const handleAcceptRequest = async (friendId) => {
    try {
      const response = await userService.acceptFriendRequest({ friendId }, user.token);
      if (response.data.status === 'ok') {
        fetchIncomingRequests(); // Re-fetch to update the list
        fetchFriends(); // Update friends list as well
      } else {
        console.error('Error accepting friend request:', response.data.error);
      }
    } catch (error) {
      console.error("Error accepting friend request", error);
    }
  };

  const handleRejectRequest = async (friendId) => {
    try {
      const response = await userService.rejectFriendRequest({ friendId }, user.token);
      if (response.data.status === 'ok') {
        fetchIncomingRequests(); // Re-fetch to update the list
      } else {
        console.error('Error rejecting friend request:', response.data.error);
      }
    } catch (error) {
      console.error("Error rejecting friend request", error);
    }
  };

  const handleSendRequest = async (userId) => {
    try {
      const response = await userService.sendFriendRequest({ friendId: userId }, user.token);
      if (response.data.status === 'ok') {
        // Maybe give some feedback or update UI
      } else {
        console.error('Error sending friend request:', response.data.error);
      }
    } catch (error) {
      console.error("Error sending friend request", error);
    }
  };

  

  return (
    <div className="friends-container">
         <div className="friends-search">
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
         </div>



         <div className="friends-list">
        <h2>My Friends</h2>
        {friends.map(friend => (
          <div key={friend._id} className="friend-item">
            <img 
              src={friend.profilePicture || 'https://skillsphere-pics.s3.amazonaws.com/default-placeholder-profile-icon-avatar-gray-man-90197957.webp'} 
              alt={friend.name} 
              className="friend-profile-pic" 
            />
            <span 
              className="friend-name" 
              onClick={() => navigateToProfile(friend._id)}
            >
              {friend.name}
            </span>
          </div>
        ))}
      </div>

      <div className="incoming-requests">
  <h2>Incoming Requests</h2>
  {incomingRequests.map(request => (
    <div key={request._id} className="request-item">
      <span 
        className="request-name" 
        onClick={() => navigateToProfile(request._id)}
      >
        {request.name}
      </span>
      <div>
        <button onClick={() => handleAcceptRequest(request._id)}>Accept</button>
        <button 
          className="reject"
          onClick={() => handleRejectRequest(request._id)}
        >
          Reject
        </button>
      </div>
    </div>
  ))}
</div>


<div className="search-results">
    <h2>Search Results</h2>
    {searchResults.length === 0 ? (
        <p>Search results will be shown here.</p>
    ) : (
        searchResults.map(result => (
            <div key={result._id} className="search-item">
                <img 
                    src={result.profilePicture || defaultProfilePic} 
                    alt={result.name} 
                    className="friend-profile-pic" 
                />
                <span 
                    className="search-result-name" 
                    onClick={() => navigateToProfile(result._id)}
                >
                    {result.name}
                </span>
                <button onClick={() => handleSendRequest(result._id)}>Send Request</button>
            </div>
        ))
    )}
</div>

    </div>
  );
};

export default FriendsPage;
