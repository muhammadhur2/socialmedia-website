import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import ChallengeService from '../../Services/ChallengesServices';
import UserContext from '../../UserContext';
import ChallengeCard from '../../Components/Challenges_Post/ChallengeCard';
import Box from '@mui/material/Box';
import { CircularProgress } from '@mui/material';

import userService from '../../Services/UserService';

const Feed = () => {
  const [challenges, setChallenges] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const token = user?.token;
        const response2 = await userService.getProfile(token);
        const profileUserId = response2.data.user._id;
        const response = await ChallengeService.getChallengesByAuthor(profileUserId, token);
        const numberofPosts= response.data.challenges.length;
        console.log("Atta kaisa hai");
        console.log(response);
        if (response.status === 200) { // Check for status 200 instead of 'ok'
          const sortedChallenges = response.data.challenges.sort((a, b) => 
            new Date(b.createdAt) - new Date(a.createdAt)
          );
          setChallenges(sortedChallenges);
        } else {
          setError('Failed to fetch challenges.');
        }
      } catch (err) {
        setError(err.message);
      }
    };

    if (user?.token) {
      fetchChallenges();
    }
  }, [user]);

  const navigateToChallenge = (challengeId) => {
    console.log(challengeId);
    navigate(`/challenge/${challengeId}`);
  };

  const timeSince = (date) => {
    const now = new Date();
    const challengeDate = new Date(date);
    const difference = now - challengeDate;
    const minutes = Math.floor(difference / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    return `${days} days ago`;
  };

  return (
    <Box sx={{ maxWidth: '600px', mx: 'auto', my: 2 }}>
      {error && <p>Error: {error}</p>}
      {!error && challenges.length > 0 ? (
        challenges.map((challenge) => (
          <Box key={challenge._id} sx={{ my: 2 }} onClick={() => navigateToChallenge(challenge._id)} style={{ cursor: 'pointer' }}>
            <ChallengeCard
              title={`${challenge.title} - ${timeSince(challenge.createdAt)}`}
              author={challenge.authorName} // Replace with the actual property name for the author's name
              date={challenge.author.name}
              avatarUrl={challenge.author.profilePicture || "https://example.com/path-to-avatar.jpg"} // Replace with actual avatar URL if available
              description={challenge.description || "No description available."}
              complexity={challenge.complexity}
              buttonGroup={challenge.tag}
              imageUrl={challenge.picture || "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"}
              readMoreLink={`https://example.com/challenges/${challenge._id}`} // Replace with actual link to challenge
            />
          </Box>
        ))
      ) : (
        !error && <CircularProgress />
      )}
    </Box>
  );
};

export default Feed;
