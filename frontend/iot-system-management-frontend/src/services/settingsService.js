import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const settingsService = {
  getAllUsers: async () => {
    try {
      const response = await axios.get(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateUser: async (userId, userData) => {
    try {
      console.log('Güncelleme isteği gönderiliyor:', {
        userId,
        userData
      });
      
      const response = await axios.put(
        `${API_URL}/users/${userId}`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json'
          },
        }
      );
      
      console.log('Sunucu yanıtı:', response.data);
      return response.data;
    } catch (error) {
      console.error('Güncelleme hatası:', error.response?.data || error.message);
      throw error;
    }
  },

  deleteUser: async (userId) => {
    try {
      await axios.delete(`${API_URL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (error) {
      throw error;
    }
  },

  createUser: async (userData) => {
    try {
      const response = await axios.post(
        `${API_URL}/users`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json'
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
