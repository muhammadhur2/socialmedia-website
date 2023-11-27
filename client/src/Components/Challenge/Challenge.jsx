import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ChallengeService from '../../Services/ChallengesServices';
import UserContext from '../../UserContext';

const ChallengeDetailPage = () => {
  const { challengeId } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);

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
    if (!newComment.trim()) return;
    try {
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
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLike = async () => {
    try {
      await ChallengeService.toggleLikeChallenge(challengeId, user.token);
  
      setIsLoading(true);
      const response = await ChallengeService.getChallengeById(challengeId, user.token);
      setChallenge(response.data.challenge);
      setIsLoading(false);
  
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
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
      
      <button onClick={handleLike}>Like</button>
        <h3>Likes: {challenge.likes.length}</h3>
        <ul>
          {challenge.likes.map((like, index) => (
            <li key={index}>{like.name}</li>
          ))}
        </ul>

      {/* Display comments */}
      <h2>Comments</h2>
      {challenge.comments && challenge.comments.map((comment, index) => (
        <div key={index}>
          <p>{comment.author ? comment.author.name : 'Unknown Author'}: {comment.text}</p>
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
