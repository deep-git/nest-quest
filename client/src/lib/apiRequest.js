import axios from "axios";

// Create baseURL for axios fetch calls to prevent constantly typing in the entire URL for each fetch

const apiRequest = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true, // enable cookies
});

export default apiRequest;