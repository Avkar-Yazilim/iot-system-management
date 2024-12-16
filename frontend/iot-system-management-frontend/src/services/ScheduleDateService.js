import axios from "axios";

const API_URL = "http://localhost:8080/api/schedule-dates";

export const ScheduleDateService = {
  getAllScheduleDates: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching schedule dates:", error);
      throw error;
    }
  },

  createScheduleDate: async (scheduleDate) => {
    try {
      const response = await axios.post(API_URL, scheduleDate);
      return response.data;
    } catch (error) {
      console.error("Error creating schedule date:", error);
      throw error;
    }
  },

  updateScheduleDate: async (id, scheduleDate) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, scheduleDate);
      return response.data;
    } catch (error) {
      console.error("Error updating schedule date:", error);
      throw error;
    }
  },
};
