import axios from "axios";

const BASE_URL="http://localhost:4000"

const API = axios.create({
    baseURL: BASE_URL, 
    timeout: 20000,
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json"
    }
  });

export default API;
