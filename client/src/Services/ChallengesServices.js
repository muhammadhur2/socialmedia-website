import axios from 'axios';
import { API_BASE} from  '../global'
const API_URL = "https://socialmedia-website-three.vercel.app/challenges";  // Replace with your API URL
// const API_URL = "http://localhost:3001/challenges"

class ChallengeService {
  
  // Create a new Challenge
  async createChallenge(challengeData, token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
        // Do not set Content-Type here
      }
    };
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
  // async getChallengesByAuthor(authorId = '', token) {
  //   const config = { headers: { Authorization: `Bearer ${token}` } };
  //   const url = `${API_URL}/byAuthor/${authorId}`;
  //   console.log(`Request URL for challenges: ${url}`);
  //   console.log(`Authorization token for challenges: ${token}`);
  
  //   try {
  //     const response = await axios.get(url, config);
  //     console.log("Response from getChallengesByAuthor:", response);
  //     return response.data;
  //   } catch (error) {
  //     console.error(`Error in getChallengesByAuthor (Client-Side):`, error);
  //     throw error;
  //   }
  // }

  async getChallengesByAuthor(authorId, token) {
    console.log("getChallengesByAuthor called with Author ID:", authorId);
    console.log("Token for request:", token);
  
    if (!authorId || !token) {
      console.error("Missing author ID or token in getChallengesByAuthor");
      return;
    }
  
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

async getChallengesByFriends(userId, token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  console.log("her")
  console.log(userId)

  console.log(token)
  const body = {
    id: userId
  };

  try {
    const response = await axios.post(`${API_URL}/challengesByFriends`, body, config);
    console.log(response.data); // Assuming you want to log the response for debugging
    return response.data;
  } catch (error) {
    console.error('Error fetching challenges by friends:', error);
    throw error;
  }
}

  // Add more methods if you need
}

  


export default new ChallengeService();
