import React, { useEffect, useState, useContext } from 'react';
import {useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import ChallengeService from '../../Services/ChallengesServices';
import UserContext from '../../UserContext';
import ChallengeCard from '../../Components/Challenges_Post/ChallengeCard';
import Box from '@mui/material/Box';
import userService from '../../Services/UserService';
import { CircularProgress } from '@mui/material';

const Feed = () => {
  const { userId } = useParams(); // Get the user identifier from URL
  console.log(userId)

  const [challenges, setChallenges] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true); // New state for loading status
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setIsLoading(true); // Start loading
        const profileUserId = userId || user.id; 
        const token = user?.token;
        const response2 = await userService.getProfile(profileUserId, token);

        const data = await ChallengeService.getChallengesByFriends(response2.data.user._id, token);
        if (data.status === 'ok') {
          const sortedChallenges = data.challenges.sort((a, b) => 
            new Date(b.createdAt) - new Date(a.createdAt)
          );
          setChallenges(sortedChallenges);
        } else {
          setError('Failed to fetch challenges.');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false); // Stop loading once data is fetched or an error occurs
      }
    };

    if (user?.token) {
      fetchChallenges();
    }
  }, [user, userId]);

  const navigateToChallenge = (challengeId) => {
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
    <Box sx={{ maxWidth: '600px', mx: 'auto', my: 2, pt: 2, boxShadow: challenges.length > 0 ? '0 6px 15px rgba(0, 0, 0, 0.2)' : 'none'}}>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>Error: {error}</p>}
      {isLoading ? (
        <CircularProgress style={{ display: 'block', margin: '0 auto' }} />
      ) : (
        challenges.length > 0 ? (
          challenges.map((challenge) => (
            <Box key={challenge._id} sx={{ my: 2 }} onClick={() => navigateToChallenge(challenge._id)} style={{ cursor: 'pointer' }}>
          <ChallengeCard
              title={`${challenge.title} - ${timeSince(challenge.createdAt)}`}
              author={challenge.authorName}
              date={challenge.author.name}
              avatarUrl={challenge.author.profilePicture || "https://example.com/path-to-avatar.jpg"}
              description={challenge.description || "No description available."}
              complexity={challenge.complexity}
              buttonGroup={challenge.tags}
              imageUrl={challenge.picture || "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"}
              readMoreLink={'/challenge/${challenge._id}'}
              likesCount={challenge.likes.length} // Display the number of likes
              />
              </Box>
          ))
        ) : (
          <p style={{ textAlign: 'center' }}>No posts found</p>
        )
      )}
    </Box>
  );
};

export default Feed;


//feed old
// import React, { useEffect, useState, useContext } from 'react';
// import ChallengeService from '../../Services/ChallengesServices'; // adjust the path as necessary
// import UserContext from '../../UserContext';
// import { useParams } from 'react-router-dom';
// import ChallengeCard from '../../Components/Challenges_Post/ChallengeCard';
// import { Card, CardHeader, CardMedia, CardContent, CardActions, Typography, Button, Avatar, Box } from '@mui/material';

// const Feed = () => {
//   const [challenges, setChallenges] = useState([]);
//   const [error, setError] = useState(null);
//   const { user } = useContext(UserContext);
//   const { userId } = useParams();

//   useEffect(() => {
//     const fetchChallenges = async () => {
//       try {
//         const profileUserId = "655f2ae9b99ccbd21ecca9a9"; // Placeholder user ID
//         const token = user?.token;

//         const data = await ChallengeService.getChallengesByFriends(profileUserId, token);
//         if (data.status === 'ok') {
//           setChallenges(data.challenges);
//         } else {
//           setError('Failed to fetch challenges.');
//         }
//       } catch (err) {
//         setError(err.message);
//       }
//     };

//     if (user?.token) {
//       fetchChallenges();
//     }
//   }, [userId, user]);

//   return (
//     <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
//       {error && <Typography color="error">{error}</Typography>}
//       {!error && challenges.length > 0 ? (
//         <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}> {/* Flex container for cards */}
//           {challenges.map((challenge) => (
//             <ChallengeCard
//               key={challenge._id}
//               title={challenge.title}
//               date={new Date(challenge.createdAt).toLocaleDateString()}
//               avatarUrl="https://example.com/path-to-avatar.jpg" // Replace with actual avatar URL if available
//               description={challenge.description || "No description available."} // Use a fallback description if none is provided
//               complexity={challenge.complexity}
//               buttonGroup={challenge.tags} // Pass the tags as buttons
//               readMoreLink={`https://example.com/challenges/${challenge._id}`} // Replace with actual link to challenge
//             />
//           ))}
//         </Box>
//       ) : (
//         !error && <Typography>No challenges to display.</Typography>
//       )}
//     </Box>
//   );
// };

// export default Feed;
