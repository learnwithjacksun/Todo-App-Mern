import axios from "axios";


const api = axios.create({
    baseURL: "https://todo-backend-bzs4.onrender.com/api",
    withCredentials: true,
})

export default api;