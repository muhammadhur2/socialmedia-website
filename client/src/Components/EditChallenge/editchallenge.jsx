import React, { useState, useEffect, useContext } from 'react';
import ChallengeService from '../../Services/ChallengesServices';
import UserContext from '../../UserContext';
import { useParams } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, TextField, Button, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

const EditChallengePage = () => {
  const [title, setTitle] = useState('');
  const [complexity, setComplexity] = useState('Bronze');
  const [tags, setTags] = useState('');
  const [description, setDescription] = useState('');
  const [originalChallenge, setOriginalChallenge] = useState({});
  const { user } = useContext(UserContext);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const { challengeId } = useParams();

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const response = await ChallengeService.getChallengeById(challengeId, user.token);
        const challenge = response.data.challenge;
        setTitle(challenge.title);
        setComplexity(challenge.complexity);
        setTags(challenge.tags.join(', '));
        setDescription(challenge.description);
        setOriginalChallenge(challenge); // Store the original data
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching challenge');
      }
    };

    fetchChallenge();
  }, [challengeId, user.token]);

  // Function to check if a field has changed
  const hasChanged = (field, newValue) => {
    return originalChallenge[field] !== newValue;
  };

  const handleUpdateChallenge = async (e) => {
    e.preventDefault();
  
    const updateData = {};
  
    // Populate the object only if fields have changed
    if (hasChanged('title', title)) {
      updateData.title = title;
    }
    if (hasChanged('complexity', complexity)) {
      updateData.complexity = complexity;
    }
    if (hasChanged('description', description)) {
      updateData.description = description;
    }
    if (hasChanged('tags', tags)) {
      updateData.tags = tags.split(',').map(tag => tag.trim());
    }
  
    try {
      // Handle the image upload separately
      if (selectedImage) {
        const formData = new FormData();
        formData.append('picture', selectedImage);
        // Append other data as well
        for (const key in updateData) {
          formData.append(key, updateData[key]);
        }
        await ChallengeService.updateChallengeWithImage(challengeId, formData, user.token);
      } else {
        await ChallengeService.updateChallenge(challengeId, updateData, user.token);
      }
      setSuccess('Challenge updated successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating challenge');
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Edit Challenge
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" sx={{ marginTop: 8 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h2" variant="h5" sx={{ mt: 4, mb: 2 }}>
            Edit Challenge
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          {success && <Typography color="success.main">{success}</Typography>}
          <Box component="form" onSubmit={handleUpdateChallenge} noValidate sx={{ mt: 1 }}>
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
              Update Challenge
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default EditChallengePage;
