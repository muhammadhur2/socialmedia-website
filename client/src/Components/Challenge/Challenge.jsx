import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ChallengeService from '../../Services/ChallengesServices'; // Adjust the path if needed
import UserContext from '../../UserContext'; // import UserContext

const ChallengeDetailPage = () => {
  const { challengeId } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [newComment, setNewComment] = useState(''); // State for new comment
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext); // Use user context

  useEffect(() => {
    const fetchChallengeDetail = async () => {
      try {
        setIsLoading(true);
        const response = await ChallengeService.getChallengeById(challengeId, user.token);
        setChallenge(response.data.challenge);
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

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return; // Prevent empty comments

    try {
      // Call the service to add a comment (Assuming it's available in ChallengeService)
      await ChallengeService.createComment(challengeId, { text: newComment }, user.token);
      setNewComment('');
      try {
        setIsLoading(true);
        const response = await ChallengeService.getChallengeById(challengeId, user.token);
        setChallenge(response.data.challenge);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      } // Refresh challenge details to show the new comment
    } catch (err) {
      setError(err.message);
    }
  };

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
      <p>Author: {challenge.author.name}</p>
      <p>Created At: {new Date(challenge.createdAt).toLocaleString()}</p>
      <p>Updated At: {new Date(challenge.updatedAt).toLocaleString()}</p>
      {/* Display comments */}
      <h2>Comments</h2>
      {challenge.comments && challenge.comments.map((comment, index) => (
        <div key={index}>
          <p>{comment.author.name}: {comment.text}</p>
        </div>
      ))}
      {/* Comment Form */}
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
        />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
};

export default ChallengeDetailPage;
