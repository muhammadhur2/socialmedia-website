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
import { AppBar, Toolbar, Typography, Container, TextField, Button, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';


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
    <Box>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h8" component="div" sx={{ flexGrow: 1 }}>
                    Create Challenge
                </Typography>
            </Toolbar>
        </AppBar>
        <Container maxWidth="sm" sx={{ marginTop: 8 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h2" variant="h5" sx={{ mt: 4, mb: 2 }}> {/* Title above the form */}
                    Create a Challenge
                </Typography>
                {error && <Typography color="error">{error}</Typography>}
                {success && <Typography color="success.main">{success}</Typography>}
                <Box component="form" onSubmit={handleCreateChallenge} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Complexity</InputLabel>
                        <Select
                            value={complexity}
                            label="Complexity"
                            onChange={(e) => setComplexity(e.target.value)}
                        >
                            <MenuItem value="Bronze">Bronze</MenuItem>
                            <MenuItem value="Silver">Silver</MenuItem>
                            <MenuItem value="Gold">Gold</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Tags (comma-separated)"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Description"
                        multiline
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        component="label"
                        fullWidth
                        sx={{ mt: 2, mb: 2 }}
                    >
                        Upload Image
                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </Button>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Create Challenge
                    </Button>
                </Box>
            </Box>
        </Container>
    </Box>
);


};

export default CreateChallengePage;