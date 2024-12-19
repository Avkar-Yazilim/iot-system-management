import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/users';

const loginService = {
    login: async (loginData) => {
        try {
            const response = await axios.post(`${BASE_URL}/login`, loginData);
            return response.data;
        } catch (error) {
            if (error.response?.status === 401) {
                throw new Error('Email veya şifre hatalı');
            }
            throw new Error(error.response?.data || 'Giriş başarısız');
        }
    },
    googleLogin: async (googleUser) => {
        try {
            console.log('Backend\'e istek atılıyor:', `${BASE_URL}/google-login`);
            console.log('Gönderilen data:', googleUser);
            
            const response = await axios.post(`${BASE_URL}/google-login`, googleUser, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            
            return response.data;
        } catch (error) {
            console.log('Backend isteği başarısız:');
            console.log('URL:', `${BASE_URL}/google-login`);
            console.log('Request Headers:', error.config?.headers);
            console.log('Request Data:', error.config?.data);
            console.log('Response Status:', error.response?.status);
            console.log('Response Data:', error.response?.data);
            
            throw new Error(
                error.response?.data?.message || 
                error.message || 
                'Google ile giriş başarısız'
            );
        }
    }
};

export default loginService;
