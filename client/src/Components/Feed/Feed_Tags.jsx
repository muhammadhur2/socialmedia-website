import React, { useEffect, useState, useContext } from 'react';
import ChallengeService from '../../Services/ChallengesServices';
import UserContext from '../../UserContext';
import ChallengeCard from '../../Components/Challenges_Post/ChallengeCard';
import Box from '@mui/material/Box';
import { CircularProgress } from '@mui/material';

const Feed_Tags = ({ tag }) => {
  const [challenges, setChallenges] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchChallengesByTag = async () => {
      try {
        const token = user.token;
        // Correctly extract data using response.data
        const response = await ChallengeService.getChallengesByTag(tag, token);
        console.log(response); // Response logged from the service
        if (response.data && response.status === 200) {
          setChallenges(response.data.challenges); // Use response.data.challenges
        } else {
          setError('Failed to fetch challenges by tag.');
        }
      } catch (err) {
        setError(err.message);
      }
    };

    if (user?.token && tag) {
      fetchChallengesByTag();
    }
  }, [tag, user]);

  return (
    <Box sx={{ maxWidth: '600px', mx: 'auto', my: 2 }}>
      {error && <p>Error: {error}</p>}
      {!error && challenges.length > 0 ? (
        challenges.map((challenge) => (
          <Box key={challenge._id} sx={{ my: 2 }}>
            <ChallengeCard
              title={challenge.title}
              date={new Date(challenge.createdAt).toLocaleString()}
              avatarUrl={challenge.author.profilePicture || "https://example.com/path-to-avatar.jpg"}
              description={challenge.description || "No description available."}
              complexity={challenge.complexity}
              buttonGroup={challenge.tags}
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

export default Feed_Tags;
