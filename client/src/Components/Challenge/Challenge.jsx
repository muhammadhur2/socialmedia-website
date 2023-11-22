import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ChallengeService from '../../Services/ChallengesServices'; // Adjust the path if needed
import UserContext from '../../UserContext'; // import UserContext

const ChallengeDetailPage = () => {
  const { challengeId } = useParams();
  const [challenge, setChallenge] = useState(null);
//   console.log(challengeId);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext); // Use user context

  useEffect(() => {
    const fetchChallengeDetail = async () => {
      try {
        setIsLoading(true);
        const response = await ChallengeService.getChallengeById(challengeId, user.token);
        console.log(response.data);
        setChallenge(response.data.challenge);
        // console.log(challenge.);
        // console.log(challenge.complexity);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (user && user.token) {
      fetchChallengeDetail();
    }
  }, [challengeId, user]);

  // useEffect(() => {
  //   console.log(challenge); // This will log the updated state
  //   console.log(challenge.complexity);
  // }, [challenge]);

  if (!user || !user.token) {
    return <div>Please log in to view challenge details.</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!challenge) {
    return <div>No challenge found.</div>;
  }

  return (
    <div>
      <h1>{challenge.title}</h1>
      <p>Complexity: {challenge.complexity}</p>
      <p>Author ID: {challenge.author}</p>
      <p>Created At: {new Date(challenge.createdAt).toLocaleString()}</p>
      <p>Updated At: {new Date(challenge.updatedAt).toLocaleString()}</p>
      {/* Render other challenge details as needed */}
    </div>
  );
};

export default ChallengeDetailPage;
