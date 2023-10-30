import axios from 'axios';

const API_URL = "http://localhost:3001/users";  // Replace with your API URL

class UserService {
  async register(userData) {
    return axios.post(`${API_URL}/register`, userData);
  }

  async login(credentials) {
    return axios.post(`${API_URL}/login`, credentials);
  }

  async getProfile(token) {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    return axios.get(`${API_URL}/profile`, config);
  }

  async updateProfile(userData, token) {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    return axios.put(`${API_URL}/updateProfile`, userData, config);
  }

  async deleteAccount(token) {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    return axios.delete(`${API_URL}/deleteAccount`, config);
  }

  async sendFriendRequest(friendData, token) {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    return axios.post(`${API_URL}/sendfriendrequest`, friendData, config);
  }

  async acceptFriendRequest(friendData, token) {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    return axios.post(`${API_URL}/acceptfriendrequest`, friendData, config);
  }

  async rejectFriendRequest(friendData, token) {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    return axios.post(`${API_URL}/rejectfriendrequest`, friendData, config);
  }

  async listFriends(token) {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    return axios.get(`${API_URL}/listfriends`, config);
  }

  async listFriendRequests(token) {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    return axios.get(`${API_URL}/listfriendrequests`, config);
  }
}

export default new UserService();
