import axios from "axios";
export const login = async (credentials) => {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}/login`, credentials, { withCredentials: true });
      return data;
    } catch (error) {
      throw error.response.data.msg || "An error occurred";
    }
};