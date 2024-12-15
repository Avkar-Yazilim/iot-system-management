import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/users';

const loginService = {
    login: async (email, password) => {
        try {
            const response = await axios.post(`${BASE_URL}/login`, {
                email: email,
                passwordHash: password  // backend'de passwordHash olarak saklanıyor
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data || 'Giriş başarısız');
        }
    }
};

export default loginService;
