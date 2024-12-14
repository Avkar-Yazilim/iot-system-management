import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

const userLogService = {
  getAllUserLogs: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user-log`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.data) {
        return [];
      }

      return response.data.map(log => ({
        ...log,
        username: log.username || 'Bilinmeyen Kullanıcı'
      }));

    } catch (error) {
      console.error("Log kayıtları alınırken hata oluştu:", error);
      throw new Error('Log kayıtları alınamadı');
    }
  }
};

export default userLogService;