import axios from 'axios';

const API_URL = "https://socialmedia-website-three.vercel.app/challenges";  // Replace with your API URL
// const API_URL = "http://localhost:3001/challenges"

class ChallengeService {
  
  // Create a new Challenge
  async createChallenge(challengeData, token) {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    return axios.post(`${API_URL}/create`, challengeData, config);
  }

  // List all Challenges with Filters
  async listChallenges(query, token) {
    const config = { headers: { Authorization: `Bearer ${token}` }, params: query };
    return axios.get(`${API_URL}/list`, config);
  }

  // Get Challenge by ID
  async getChallengeById(id, token) {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    return axios.get(`${API_URL}/${id}`, config);
  }

  // Update Challenge by ID
  async updateChallenge(id, updateData, token) {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    return axios.put(`${API_URL}/update/${id}`, updateData, config);
  }

  // Delete Challenge by ID
  async deleteChallenge(id, token) {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    return axios.delete(`${API_URL}/delete/${id}`, config);
  }

  // Get Challenges by Tag
  async getChallengesByTag(tag, token) {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    return axios.get(`${API_URL}/byTag/${tag}`, config);
  }

  // Get Challenges by Author
  async getChallengesByAuthor(authorId, token) {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    return axios.get(`${API_URL}/byAuthor/${authorId}`, config);
  }

  // Get Challenges by Complexity
  async getChallengesByComplexity(complexity, token) {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    return axios.get(`${API_URL}/byComplexity/${complexity}`, config);
  }

  async createComment(challengeId, commentData, token) {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    console.log(API_URL);
    console.log(challengeId);
    console.log(commentData);
    return axios.post(`${API_URL}/${challengeId}/comments/create`, commentData, config);
  }

  // Get Comments of a Challenge
  async getComments(challengeId, token) {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    return axios.get(`${API_URL}/${challengeId}/comments`, config);
  }

  // Update a Comment
  async updateComment(challengeId, commentId, commentData, token) {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    return axios.put(`${API_URL}/${challengeId}/comments/update/${commentId}`, commentData, config);
  }

  // Delete a Comment
  async deleteComment(challengeId, commentId, token) {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    return axios.delete(`${API_URL}/${challengeId}/comments/delete/${commentId}`, config);
  }

  // Add a like to a challenge
async likeChallenge(challengeId, token) {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  return axios.post(`${API_URL}/${challengeId}/like`, {}, config);
}

// Remove a like from a challenge
// Inside ChallengeService

async unlikeChallenge(challengeId, token) {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  return axios.post(`${API_URL}/${challengeId}/unlike`, {}, config);
}

async toggleLikeChallenge(challengeId, token) {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  return axios.post(`${API_URL}/challenges/${challengeId}/toggleLike`, {}, config);
}

  
  // Add more methods if you need
}

  
  // Add more methods if you need


export default new ChallengeService();
