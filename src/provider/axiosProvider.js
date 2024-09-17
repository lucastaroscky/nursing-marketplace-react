import axios from "axios";
import { refreshToken } from "../services/apiService";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL_API,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response, config } = error;
    console.log({ response, config });

    if (response && response.status === 401) {
      try {
        const newAccessToken = await refreshToken();

        config.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return axiosInstance.request(config);
      } catch (err) {
        console.log(err);
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
