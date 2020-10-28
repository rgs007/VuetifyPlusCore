import axios from 'axios';

const API_URL = 'api/';

class AuthService {
    login() {
        return axios
            .get(API_URL + 'login', { withCredentials: true 
                 })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }
}
export default new AuthService();