import axios from "axios";

// Create baseURL for axios fetch calls to prevent constantly typing in the entire URL for each fetch

const apiRequest = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true, // enable cookies
});

export default apiRequest;