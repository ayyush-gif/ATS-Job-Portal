import axios from "axios";

const API = axios.create({
  baseURL: "https://ats-job-portal.onrender.com/api",
});

export default API;