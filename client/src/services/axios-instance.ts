import axios from "axios";

// Create axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/financial-records",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor
// axiosInstance.interceptors.request.use(
//     (config) => {
//       const accessToken = localStorage.getItem("token");
//       if (accessToken) {
//         config.headers.Authorization = `Bearer ${accessToken}`;
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

export default axiosInstance;
