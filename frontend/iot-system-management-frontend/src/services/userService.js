import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
const API_URL = `${BASE_URL}/api/users`;

const resetPassword = async (email) => {
  try {
    console.log("Gönderilen e-posta adresi:", email);
    const response = await axios.post(`${API_URL}/reset-password`, { email });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Şifre sıfırlama işlemi başarısız oldu');
  }
};

export default {
  resetPassword,
};
