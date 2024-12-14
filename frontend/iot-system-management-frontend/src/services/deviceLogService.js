import axios from "axios";
const BASE_URL = "http://localhost:8080/api";

const deviceLogService = {
  getDeviceLogs: async (deviceId) => {
    try {
      const response = await axios.get(`${BASE_URL}/logs/${deviceId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default deviceLogService;
