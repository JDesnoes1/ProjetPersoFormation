import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "http://localhost:8500/api/",
  withCredentials: true,
});
