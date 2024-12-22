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
      const response = await axios.delete(
        `${BASE_URL}/devices/${deviceId}?username=${username}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  exportDevicesToJSON: async () => {
    try {
      // Mevcut getAllDevices fonksiyonunu kullan
      const devices = await deviceService.getAllDevices();

      // JSON string'i oluştur (pretty print ile)
      const jsonStr = JSON.stringify(devices, null, 2);

      // Blob oluştur
      const blob = new Blob([jsonStr], { type: "application/json" });

      // Download link oluştur
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "devices.json");

      // Linki tıkla ve temizle
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("JSON indirme hatası:", error);
      throw error;
    }
  },

  importDevicesFromJSON: async (file) => {
    try {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
          try {
            const devices = JSON.parse(e.target.result);
            // Her cihaz için create isteği gönder
            const promises = devices.map((device) =>
              deviceService.createDevice({
                deviceId: device.deviceId,
                deviceName: device.deviceName,
                deviceType: device.deviceType,
              })
            );
            await Promise.all(promises);
            resolve();
          } catch (error) {
            reject(error);
          }
        };
        reader.onerror = () => reject(new Error("Dosya okuma hatası"));
        reader.readAsText(file);
      });
    } catch (error) {
      console.error("JSON import hatası:", error);
      throw error;
    }
  },
};

export default deviceService;
