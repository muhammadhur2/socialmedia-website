import React, { useEffect, useState, useContext } from 'react';
import ChallengeService from '../../Services/ChallengesServices';
import UserContext from '../../UserContext';
import { useParams } from 'react-router-dom';
import ChallengeCard from '../../Components/Challenges_Post/ChallengeCard';
import Box from '@mui/material/Box';

const Feed = () => {
  const [challenges, setChallenges] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        // const profileUserId = user?.id;
         // Use the user ID from the context
        const profileUserId = "655f2ae9b99ccbd21ecca9a9"; // Placeholder user ID
        const token = user?.token;

        const data = await ChallengeService.getChallengesByFriends(profileUserId, token);
        if (data.status === 'ok') {
          setChallenges(data.challenges);
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
              date={new Date(challenge.createdAt).toLocaleDateString()}
              avatarUrl="https://example.com/path-to-avatar.jpg" // Replace with actual avatar URL if available
              description={challenge.description || "No description available."}
              complexity={challenge.complexity}
              buttonGroup={challenge.tags}
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
