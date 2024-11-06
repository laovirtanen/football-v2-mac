// api/apiClient.js
import { Alert } from "react-native";

// Replace 'YOUR_LOCAL_IP' with your actual local IP address
const BASE_URL = "http://192.168.8.66:8000"; // e.g., 'http://192.168.1.100:8000'

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
  // Add other methods (post, put, delete) as needed
};

export default apiClient;
