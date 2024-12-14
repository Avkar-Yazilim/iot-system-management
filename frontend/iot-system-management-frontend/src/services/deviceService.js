import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

const deviceService = {
  getAllDevices: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/devices`);
      console.log("API Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching devices:", error);
      throw error;
    }
  },

  getDeviceById: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/devices/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching device:", error);
      throw error;
    }
  },

  createDevice: async (deviceData) => {
    try {
      console.log("POST isteği gönderiliyor:", deviceData);
      const response = await axios.post(`${BASE_URL}/devices`, deviceData);
      console.log("Backend response:", response);
      console.log("Response data:", response.data);
      return response.data;
    } catch (error) {
      console.error("POST hatası:", error);
      console.error("Response detayı:", error.response);
      throw error;
    }
  },

  updateDevice: async (id, deviceData) => {
    try {
      const response = await axios.put(`${BASE_URL}/devices/${id}`, deviceData);
      return response.data;
    } catch (error) {
      console.error("Error updating device:", error);
      throw error;
    }
  },

  deleteDevice: async (deviceId, username) => {
    try {
      const response = await axios.delete(`${BASE_URL}/devices/${deviceId}?username=${username}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default deviceService;
