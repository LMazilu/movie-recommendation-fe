import axios from "axios";


/**
 * Creates an instance of axios with the base URL set to the value of the
 * REACT_APP_API_URL environment variable.
 *
 * @returns {AxiosInstance} The axios instance with the base URL.
 */
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});


/**
 * Intercepts the request config and adds the Authorization header if a token is
 * present in localStorage.
 *
 * @param {object} config - The request config object.
 * @returns {object} The modified request config object.
 */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
