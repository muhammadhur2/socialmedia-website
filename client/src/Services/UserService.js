import axios from 'axios';

const API_URL = "https://socialmedia-website-three.vercel.app/users";  // Replace with your API URL
// const API_URL = "http://localhost:3001/users";  // Replace with your API URL

class UserService {
  async register(userData) {
    // Assuming the server expects multipart/form-data
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    return axios.post(`${API_URL}/register`, userData, config);
  }

  // async login(credentials) {
  //   return axios.post(`${API_URL}/login`, credentials);
  // }
// 

  async login(credentials) {
    const response = await axios.post(`${API_URL}/login`, credentials);
    console.log("Axios response:", response);

    // Check for custom status 'ok'
    if (response.data.status === 'ok') {
        return response.data; 
    } else {
        throw new Error(response.data.message || "Server returned an unexpected status.");
    }
}



async getProfile(token) {
  
  const config = { headers: { Authorization: `Bearer ${token}` } };

  // Construct the URL using the userId parameter
  const url =  `${API_URL}/profile`;
  console.log(`Request URL: ${url}`);
  console.log(`Request token: ${token}`);

  return axios.get(url, config);
}

// In UserService

async updateProfile(userData, token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data' // This is important for file uploads
    }
  };
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


  async searchFriends(token, searchTerm) {
    const config = { 
      headers: { Authorization: `Bearer ${token}` },
      params: { q: searchTerm }
    };
    return axios.get(`${API_URL}/searchFriends`, config);
  }
}



export default new UserService();
