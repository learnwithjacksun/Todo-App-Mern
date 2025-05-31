import axios from "axios";

const dev = false;

const baseURL = dev ? "http://localhost:4000/api" : "https://todo-backend-bzs4.onrender.com/api";


const api = axios.create({
    baseURL,
    withCredentials: true,
})

export default api;