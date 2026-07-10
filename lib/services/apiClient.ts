import { BASE_URL } from "@/config/config";
import { STORAGE_KEYS } from "@/constants/storageKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const headers = {
  Accept: "application/json",
  'X-API-KEY': '8463923edfd546dfbbef86805d8aefa381e1d1b0',
  
};
export const Axios = axios.create({
  baseURL: BASE_URL,
  headers: headers,
});

Axios.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem(STORAGE_KEYS.token);
      

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      console.log("Error fetching token:", err);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;

    if (status === 401 || status === 403) {
      
      
    }

    return Promise.reject(error);
  },
);

export default Axios;
