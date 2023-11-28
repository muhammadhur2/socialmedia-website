import React, { useEffect, useState, useContext } from 'react';
import ChallengeService from '../../Services/ChallengesServices';
import UserContext from '../../UserContext';
import ChallengeCard from '../../Components/Challenges_Post/ChallengeCard';
import Box from '@mui/material/Box';
import userService from '../../Services/UserService';

const Feed = () => {
  const [challenges, setChallenges] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const token = user?.token;
        const response2 = await userService.getProfile(token);
        console.log("pakistan jeeway")
        const profileUserId = response2.data.user._id;
        const response = await ChallengeService.getChallengesByAuthor(profileUserId, token);
        console.log(response);
        if (response.status === 200) { // Check for status 200 instead of 'ok'
          setChallenges(response.data.challenges); // Use `response.data.challenges` instead of `data.challenges`
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

  return (
    <Box sx={{ maxWidth: '600px', mx: 'auto', my: 2 }}>
      {error && <p>Error: {error}</p>}
      {!error && challenges.length > 0 ? (
        challenges.map((challenge) => (
          <Box key={challenge._id} sx={{ my: 2 }}>
            <ChallengeCard
              title={challenge.title}
              date={new Date(challenge.createdAt).toLocaleString()}
              avatarUrl="https://example.com/path-to-avatar.jpg" // Replace with actual avatar URL if available
              description={challenge.description || "No description available."}
              complexity={challenge.complexity}
              buttonGroup={challenge.tags.filter(tag => tag)} // Filter out empty tags
              imageUrl="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
              readMoreLink={`https://example.com/challenges/${challenge._id}`} // Replace with actual link to challenge
            />
          </Box>
        ))
      ) : (
        !error && <p>No challenges to display.</p>
      )}
    </Box>
  );
};

export default Feed;
