import axios from "axios";

const api = axios.create({
  baseURL: "https://mern-typescript-6pps.onrender.com/api",
});

export default api;
