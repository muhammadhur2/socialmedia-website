import axios from 'axios';

const API_URL = "https://socialmedia-website-three.vercel.app/posts";  // Replace with your API URL
// const API_URL = "http://localhost:3001/posts";
class PostService {
  async createPost(postData, token) {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    return axios.post(`${API_URL}/createpost`, postData, config);
  }

  async getPosts(token) {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    return axios.get(`${API_URL}/getposts`, config);
  }

  async deletePost(postId, token) {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    return axios.delete(`${API_URL}/deletepost/${postId}`, config);
  }

  // Add more methods if you need
}

export default new PostService();
