import axios from "axios";

export const api = axios.create({
  baseURL: "https://my-portfolio-production-cc1c.up.railway.app",
  withCredentials: true,
});
