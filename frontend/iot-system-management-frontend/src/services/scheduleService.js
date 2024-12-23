import axios from "axios";

const API_URL = "http://localhost:8080/api/schedules";

export const ScheduleService = {
  getAllSchedules: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching schedules:", error);
      throw error;
    }
  },

  getScheduleById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching schedule:", error);
      throw error;
    }
  },

  createSchedule: async (scheduleData) => {
    try {
      console.log("Service - Sending data:", scheduleData);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(scheduleData),
      });

      console.log("Service - Raw response status:", response.status);
      const responseText = await response.text();
      console.log("Service - Raw response text:", responseText);

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status}, body: ${responseText}`
        );
      }

      try {
        return responseText ? JSON.parse(responseText) : {};
      } catch (e) {
        console.error("Error parsing response:", e);
        throw new Error(`Invalid JSON response: ${responseText}`);
      }
    } catch (error) {
      console.error("Service error:", error);
      throw error;
    }
  },

  updateSchedule: async (id, scheduleData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, scheduleData);
      return response.data;
    } catch (error) {
      console.error("Error updating schedule:", error);
      throw error;
    }
  },

  deleteSchedule: async (id, deletedBy) => {
    try {
      const response = await axios.delete(
        `${API_URL}/${id}?deletedBy=${deletedBy}`
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting schedule:", error);
      throw error;
    }
  },

  activateSchedule: async (id, activatedBy) => {
    try {
      const response = await axios.put(
        `${API_URL}/${id}/activate?activatedBy=${activatedBy}`
      );
      return response.data;
    } catch (error) {
      console.error("Error activating schedule:", error);
      throw error;
    }
  },

  deactivateSchedule: async (id, deletedBy) => {
    try {
      const response = await axios.put(
        `${API_URL}/${id}/deactivate?deletedBy=${deletedBy}`
      );
      return response.data;
    } catch (error) {
      console.error("Error deactivating schedule:", error);
      throw error;
    }
  },
};
