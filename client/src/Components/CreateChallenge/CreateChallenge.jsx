import React, { useState, useContext } from 'react';
import ChallengeService from '../../Services/ChallengesServices'; // Adjust the path if needed
import UserContext from '../../UserContext'; // import UserContext

const CreateChallengePage = () => {
  const [title, setTitle] = useState('');
  const [complexity, setComplexity] = useState('Bronze');
  const [tags, setTags] = useState('');
  const { user } = useContext(UserContext);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleCreateChallenge = async (e) => {
    e.preventDefault();

    // Split tags by comma and trim each tag
    const tagsArray = tags.split(',').map(tag => tag.trim());

    console.log(user)
    const challengeData = {
      title,
      complexity,
      tags: tagsArray,
      // author: user.id, // Assuming user object contains _id
    };

    try {
      console.log(title);
      console.log(complexity);
      console.log(tags);
      // console.log(user._id);
      const response = await ChallengeService.createChallenge(challengeData, user.token);
      
      if (response && response.data) {
        setSuccess('Challenge created successfully!');
        // Reset form fields
        setTitle('');
        setComplexity('Bronze');
        setTags('');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating challenge');
      console.log(err)
    }
  };

  return (
    <div>
      <h1>Create New Challenge</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
      <form onSubmit={handleCreateChallenge}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Complexity:</label>
          <select
            value={complexity}
            onChange={(e) => setComplexity(e.target.value)}
          >
            <option value="Bronze">Bronze</option>
            <option value="Silver">Silver</option>
            <option value="Gold">Gold</option>
          </select>
        </div>
        <div>
          <label>Tags (comma-separated):</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <button type="submit">Create Challenge</button>
      </form>
    </div>
  );
};

export default CreateChallengePage;
