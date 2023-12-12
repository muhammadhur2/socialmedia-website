import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ChallengeService from '../../Services/ChallengesServices';
import UserContext from '../../UserContext';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

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
    return <div className="container mt-3">Please log in to view challenge details.</div>;
  }

  if (isLoading) {
    return <div className="container mt-3">Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger container mt-3">Error: {error}</div>;
  }

  if (!challenge) {
    return <div className="container mt-3">No challenge found.</div>;
  }

  // Main content rendering
  return (
    <div className="container mt-3">
      <h1 className="display-4">{challenge.title}</h1>
      <p className="text-muted">Complexity: {challenge.complexity}</p>
      <p>Author: {challenge.author.name}</p>
      <p>Created At: {new Date(challenge.createdAt).toLocaleString()}</p>
      <p>Updated At: {new Date(challenge.updatedAt).toLocaleString()}</p>

      <button className="btn btn-primary" onClick={handleLike}>Like</button>
      <h3>Likes: {challenge.likes.length}</h3>
      <ul className="list-unstyled">
        {challenge.likes.map((like, index) => (
          <li key={index}>{like.name}</li>
        ))}
      </ul>

      <h2>Comments</h2>
      {challenge.comments && challenge.comments.map((comment, index) => (
        <div key={index} className="mb-2">
          <strong>{comment.author ? comment.author.name : 'Unknown Author'}:</strong>
          <p>{comment.text}</p>
        </div>
      ))}

      <form onSubmit={handleCommentSubmit} className="mb-3">
        <textarea
          className="form-control"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          rows="3"
        />
        <button type="submit" className="btn btn-success mt-2">Add Comment</button>
      </form>
    </div>
  );
};

export default ChallengeDetailPage;