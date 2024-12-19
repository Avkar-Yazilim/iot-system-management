import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/users';

export const registerService = {
    register: async (userData) => {
        try {
            const response = await axios.post(`${BASE_URL}/register`, userData);
            return response.data;
        } catch (error) {
            if (error.response?.status === 409) {
                throw new Error('Bu email adresi zaten kayıtlı');
            }
            throw new Error(error.response?.data || 'Kayıt başarısız');
        }
    },

    sendOTP: async (email) => {
        try {
            const response = await axios.post(`${BASE_URL}/send-otp`, { email });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'OTP gönderilemedi');
        }
    },

    verifyOTP: async (email, otp) => {
        try {
            const response = await axios.post(`${BASE_URL}/verify-otp`, { email, otp });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'OTP doğrulaması başarısız');
        }
    }
};
