// import React, { useState, useContext } from 'react';
// import ChallengeService from '../../Services/ChallengesServices'; // Adjust the path if needed
// import UserContext from '../../UserContext'; // Import UserContext

// const CreateChallengePage = () => {
//   const [title, setTitle] = useState('');
//   const [complexity, setComplexity] = useState('Bronze');
//   const [tags, setTags] = useState('');
//   const [description, setDescription] = useState(''); // State for the description
//   const { user } = useContext(UserContext);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [selectedImage, setSelectedImage] = useState(null);


//   const handleCreateChallenge = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('complexity', complexity);
//     formData.append('description', description);

//     // Split tags by comma and trim each tag
//     const tagsArray = tags.split(',').map(tag => tag.trim());
//     formData.append('tags', JSON.stringify(tagsArray)); // Convert array to JSON string

//     if (selectedImage) {
//       formData.append('picture', selectedImage); // Append the image file
//     }

//     try {
//       const response = await ChallengeService.createChallenge(formData, user.token);

//       if (response && response.data) {
//         setSuccess('Challenge created successfully!');
//         // Reset form fields
//         setTitle('');
//         setComplexity('Bronze');
//         setTags('');
//         setDescription(''); // Reset description field
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || 'Error creating challenge');
//     }
//   };

//   return (
//     <div>
//       <h1>Create New Challenge</h1>
//       {error && <div style={{ color: 'red' }}>{error}</div>}
//       {success && <div style={{ color: 'green' }}>{success}</div>}
//       <form onSubmit={handleCreateChallenge}>
//         <div>
//           <label>Title:</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Complexity:</label>
//           <select
//             value={complexity}
//             onChange={(e) => setComplexity(e.target.value)}
//           >
//             <option value="Bronze">Bronze</option>
//             <option value="Silver">Silver</option>
//             <option value="Gold">Gold</option>
//           </select>
//         </div>
//         <div>
//           <label>Tags (comma-separated):</label>
//           <input
//             type="text"
//             value={tags}
//             onChange={(e) => setTags(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Description:</label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Image:</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setSelectedImage(e.target.files[0])}
//           />
//         </div>

//         <button type="submit">Create Challenge</button>
//       </form>
//     </div>
//   );
// };

// export default CreateChallengePage;


import React, { useState, useContext } from 'react';
import ChallengeService from '../../Services/ChallengesServices';
import UserContext from '../../UserContext';

const CreateChallengePage = () => {
  const [title, setTitle] = useState('');
  const [complexity, setComplexity] = useState('Bronze');
  const [tags, setTags] = useState('');
  const [description, setDescription] = useState('');
  const { user } = useContext(UserContext);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleCreateChallenge = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('complexity', complexity);
    formData.append('description', description);
    const tagsArray = tags.split(',').map(tag => tag.trim());
    formData.append('tags', JSON.stringify(tagsArray));
    if (selectedImage) {
      formData.append('picture', selectedImage);
    }



    try {
      const response = await ChallengeService.createChallenge(formData, user.token);
      
      if (response && response.data) {
        setSuccess('Challenge created successfully!');
        setTitle('');
        setComplexity('Bronze');
        setTags('');
        setDescription('');
        setSelectedImage(null);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating challenge');
    }
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
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
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Image:</label>
          <input
            type="file"
            name="picture"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit">Create Challenge</button>
      </form>
    </div>
  );
};

export default CreateChallengePage;
