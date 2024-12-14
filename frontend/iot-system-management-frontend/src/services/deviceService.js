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
      const response = await axios.post(`${BASE_URL}/devices`, deviceData);
      return response.data;
    } catch (error) {
      console.error("Error creating device:", error);
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

  deleteDevice: async (id) => {
    try {
      await axios.delete(`${BASE_URL}/devices/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting device:", error);
      throw error;
    }
  },
};

export default deviceService;
