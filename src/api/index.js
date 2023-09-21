import axios from "axios";

const baseURL = `${process.env.REACT_APP_BASE_URL}`;
const API = axios.create({
  baseURL: baseURL,
  timeout: 20000,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
});

// List of endpoints that require JWT
const securedEndpoints = [
  "get-all-vehicles",
  "delete-vehicle",
  "get-all-agents",
  "register-agent",
];

// Add a request interceptor to include the JWT for specific endpoints
API.interceptors.request.use(
  (config) => {
    if (securedEndpoints.some((endpoint) => config.url.includes(endpoint))) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
