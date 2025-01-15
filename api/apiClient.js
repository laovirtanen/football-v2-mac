// api/apiClient.js
import { Alert } from "react-native";

const BASE_URL = "http://192.168.8.113:8000"; 

const apiClient = {
  get: async (endpoint) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      Alert.alert("Network Error", "Unable to fetch data from the server.");
      throw error;
    }
  },
};

export default apiClient;
