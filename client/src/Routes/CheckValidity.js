import { jwtDecode } from 'jwt-decode';

const isTokenValid = (token) => {
    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // convert to seconds
        return decodedToken.exp > currentTime;
    } catch (error) {
        return false;
    }
};

export default isTokenValid;