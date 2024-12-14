import axios from "axios";
const BASE_URL = "http://localhost:8080/api";

const batchCommandService = {
  getBatchCommands: async (deviceId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/batch-commands/${deviceId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createBatchCommand: async (commandData) => {
    if (
      !commandData.priority ||
      commandData.priority < 1 ||
      commandData.priority > 5
    ) {
      throw new Error("Priority must be between 1 and 5");
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/batch-commands`,
        commandData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateCommandStatus: async (commandId, status, feedback) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/batch-commands/${commandId}`,
        { status, feedback }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getPendingCommands: async (deviceId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/batch-commands/pending/${deviceId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default batchCommandService;
