import axios from "axios";

const BASE_URL = "http://localhost:8080/api/sensor-values";

const sensorValuesService = {
  // Tüm sensör değerlerini getir
  getAllSensorValues: async () => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching all sensor values:", error);
      throw error;
    }
  },

  // Belirli bir cihazın tüm sensör değerlerini getir
  getSensorValuesByDeviceId: async (deviceId) => {
    try {
      const response = await axios.get(`${BASE_URL}/device/${deviceId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching sensor values by device ID:", error);
      throw error;
    }
  },
  // Belirli bir cihazın en son sensör değerlerini getir
  getLatestValuesForDevice: async (deviceId) => {
    try {
      const response = await axios.get(`${BASE_URL}/latest/device/${deviceId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching latest values for device:", error);
      throw error;
    }
  },

  // Tüm cihazların en son sensör değerlerini getir
  getLatestValuesForAllDevices: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/latest`);
      return response.data;
    } catch (error) {
      console.error("Error fetching latest values for all devices:", error);
      throw error;
    }
  },

  // Belirli bir sensör tipi için tüm cihazların en son değerlerini getir
  getLatestValuesBySensorType: async (sensorType) => {
    try {
      const response = await axios.get(`${BASE_URL}/latest/type/${sensorType}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching latest values by sensor type:", error);
      throw error;
    }
  },

  // Belirli bir cihazın belirli bir sensör tipi için son N değerini getir
  getLastNValuesByDeviceAndType: async (deviceId, sensorType, count) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/device/${deviceId}/type/${sensorType}/last/${count}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching last N values:", error);
      throw error;
    }
  },
};

export default sensorValuesService;
