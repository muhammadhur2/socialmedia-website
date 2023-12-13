import axios from 'axios';

const API_URL = "https://socialmedia-website-three.vercel.app";  // Replace with your actual API URL
// const API_URL = "http://localhost:3001";  // Replace with your API URL

class uploadService {
    async uploadImage(formData) {
        axios.post(`${API_URL}/images/upload`, formData);
    }
}


export default new uploadService();
