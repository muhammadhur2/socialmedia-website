import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ChallengeService from '../../Services/ChallengesServices'; // Adjust the path if needed
import UserContext from '../../UserContext'; // Import UserContext

const ChallengeListPage = () => {
  const [challenges, setChallenges] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await ChallengeService.listChallenges({}, user.token);
        console.log("API Response:", response.data); // Log to inspect the structure
        
        if (Array.isArray(response.data.challenges)) {
          setChallenges(response.data.challenges);
        } else {
          console.error("Received data is not an array:", response.data);
          setChallenges([]);
        }
      } catch (error) {
        console.error('Error fetching challenges:', error);
        setChallenges([]); // Reset to empty array on error
      }
    };

    fetchChallenges();
  }, [user.token]);

  const handleChallengeClick = (challengeId) => {
    navigate(`/challenge/${challengeId}`);
  };

  const navigateToCreateChallenge = () => {
    navigate('/createchallenge'); // Adjust the path as per your routing setup
  };

  return (
    <div>
      <h1>Challenges</h1>
      <button onClick={navigateToCreateChallenge} style={{ margin: '10px 0' }}>Create New Challenge</button>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {challenges.map((challenge) => (
          <div
            key={challenge._id}
            style={{ border: '1px solid black', padding: '10px', cursor: 'pointer' }}
            onClick={() => handleChallengeClick(challenge._id)}
          >
            <h2>{challenge.title}</h2>
            <p>Author: {challenge.author && challenge.author.name ? challenge.author.name : 'Unknown'}</p>
            <p>Likes: {challenge.likes.length}</p> {/* Display number of likes */}
            <p>Comments: {challenge.comments.length}</p> {/* Display number of comments */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChallengeListPage;
