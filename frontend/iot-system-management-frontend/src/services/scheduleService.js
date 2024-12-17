import axios from "axios";

const API_URL = "http://localhost:8080/api/schedules";

export const ScheduleService = {

  createSchedule: async (Schedule) => {
    try {
      const response = await axios.post(API_URL, Schedule);
      return response.data;
    } catch (error) {
      console.error("Error creating schedule:", error);
      throw error;
    }
  },

  updateSchedule: async (id, Schedule) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, Schedule);
      return response.data;
    } catch (error) {
      console.error("Error updating schedule:", error);
      throw error;
    }
  },
};


